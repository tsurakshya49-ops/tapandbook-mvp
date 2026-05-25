// Global mock data used by new screens (no backend required)

export const DOCTORS = [
  { id: 1, name: 'Dr. Ramesh Sharma', initials: 'RS', specialty: 'Cardiologist', hospital: 'Bir Hospital', rating: 4.8, reviews: 124, experience: 15, availability: 'Today: Available' },
  { id: 2, name: 'Dr. Sita Koirala', initials: 'SK', specialty: 'General Physician', hospital: 'TUTH', rating: 4.6, reviews: 98, experience: 10, availability: 'Today: Available' },
  { id: 3, name: 'Dr. Bikash Thapa', initials: 'BT', specialty: 'Orthopaedic Surgeon', hospital: 'Bir Hospital', rating: 4.7, reviews: 87, experience: 12, availability: 'Today: Busy' },
  { id: 4, name: 'Dr. Anita Rai', initials: 'AR', specialty: 'Paediatrician', hospital: 'Kanti Children\'s Hospital', rating: 4.9, reviews: 203, experience: 8, availability: 'Today: Available' },
  { id: 5, name: 'Dr. Suresh Poudel', initials: 'SP', specialty: 'ENT Specialist', hospital: 'Civil Hospital', rating: 4.5, reviews: 76, experience: 20, availability: 'Today: Available' },
  { id: 6, name: 'Dr. Priya Shrestha', initials: 'PS', specialty: 'Gynaecologist', hospital: 'TUTH', rating: 4.8, reviews: 156, experience: 14, availability: 'Today: Available' },
  { id: 7, name: 'Dr. Nabin Karki', initials: 'NK', specialty: 'General Physician', hospital: 'Civil Hospital', rating: 4.3, reviews: 45, experience: 6, availability: 'Today: Available' },
  { id: 8, name: 'Dr. Meera Joshi', initials: 'MJ', specialty: 'Paediatrician', hospital: 'Kanti Children\'s Hospital', rating: 4.7, reviews: 132, experience: 11, availability: 'Today: Busy' },
]

export const HOSPITALS = [
  { id: 'bir', name: 'Bir Hospital', type: 'General & Specialist', wait: '~45 min', rating: 4.2, status: 'Open' },
  { id: 'tuth', name: 'TUTH', type: 'Teaching Hospital', wait: '~1 hr', rating: 4.5, status: 'Open' },
  { id: 'kanti', name: 'Kanti Children\'s Hospital', type: 'Paediatrics', wait: '~30 min', rating: 4.6, status: 'Open' },
]
