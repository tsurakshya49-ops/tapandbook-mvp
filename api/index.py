from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Tap&Book API", version="1.0.0")

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# Pydantic models for request bodies
class BookingCreate(BaseModel):
    patient_name: str
    patient_phone: str
    doctor_name: str
    speciality: str
    hospital: str
    appointment_date: str
    time_slot: str
    token_number: int


class UserCreate(BaseModel):
    name: str
    phone: str
    gender: str = None
    date_of_birth: str = None
    address: str = None
    emergency_contact: str = None


class LoginRequest(BaseModel):
    phone: str
    password: str


class SignupRequest(BaseModel):
    phone: str
    password: str
    name: str


# Health check endpoint
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Tap&Book API is running"}


# POST /bookings - Save a new booking to Supabase bookings table
@app.post("/bookings")
def create_booking(booking: BookingCreate):
    try:
        data = {
            "patient_name": booking.patient_name,
            "patient_phone": booking.patient_phone,
            "doctor_name": booking.doctor_name,
            "speciality": booking.speciality,
            "hospital": booking.hospital,
            "appointment_date": booking.appointment_date,
            "time_slot": booking.time_slot,
            "token_number": booking.token_number,
            "status": "Confirmed"
        }
        
        result = supabase.table("bookings").insert(data).execute()
        
        if result.data:
            return {"success": True, "data": result.data[0]}
        else:
            raise HTTPException(status_code=500, detail="Failed to create booking")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# GET /bookings - Get all bookings from Supabase
@app.get("/bookings")
def get_bookings():
    try:
        result = supabase.table("bookings").select("*").order("created_at", desc=True).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# POST /users - Save a new user to Supabase users table
@app.post("/users")
def create_user(user: UserCreate):
    try:
        data = {
            "name": user.name,
            "phone": user.phone,
            "gender": user.gender,
            "date_of_birth": user.date_of_birth,
            "address": user.address,
            "emergency_contact": user.emergency_contact
        }
        
        result = supabase.table("users").insert(data).execute()
        
        if result.data:
            return {"success": True, "data": result.data[0]}
        else:
            raise HTTPException(status_code=500, detail="Failed to create user")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# GET /users/{phone} - Get a user by phone number
@app.get("/users/{phone}")
def get_user_by_phone(phone: str):
    try:
        result = supabase.table("users").select("*").eq("phone", phone).execute()
        
        if result.data and len(result.data) > 0:
            return {"success": True, "data": result.data[0]}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# POST /auth/login - Authenticate user with Supabase Auth
@app.post("/auth/login")
def login(request: LoginRequest):
    try:
        email = f"{request.phone}@tapandbook.com"
        result = supabase.auth.sign_in_with_password({"email": email, "password": request.password})
        return {"access_token": result.session.access_token, "user": {"id": result.user.id, "email": result.user.email}}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid phone or password")


# POST /auth/signup - Register new user with Supabase Auth
@app.post("/auth/signup")
def signup(request: SignupRequest):
    try:
        email = f"{request.phone}@tapandbook.com"
        result = supabase.auth.sign_up({"email": email, "password": request.password, "options": {"data": {"name": request.name}}})
        if result.session is None:
            # Email confirmation is enabled in Supabase - user created but no session yet
            return {
                "access_token": None,
                "user": {
                    "id": result.user.id,
                    "email": result.user.email,
                    "name": request.name
                },
                "message": "Account created successfully. Please log in."
            }
        return {"access_token": result.session.access_token, "user": {"id": result.user.id, "email": result.user.email, "name": request.name}}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)