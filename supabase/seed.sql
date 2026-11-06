-- LifeLink Supabase Initial Seed Data v1.0
-- Fictional Dhaka demo data

-- 1. Seed Hospitals
INSERT INTO public.hospitals (id, name, type, area, city, address, emergency_phone, has_emergency_blood_bank, image_url) VALUES
('a1111111-1111-1111-1111-111111111111', 'Panthapath General Hospital', 'Tertiary Specialized Hospital', 'Panthapath', 'Dhaka', '18F West Panthapath, Dhaka 1205', 'Not provided in demo', true, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600'),
('a2222222-2222-2222-2222-222222222222', 'Dhanmondi Diagnostic Centre', 'Diagnostic & Consultation Center', 'Dhanmondi', 'Dhaka', 'House 16, Road 2, Dhanmondi, Dhaka 1205', 'Not provided in demo', true, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'),
('a3333333-3333-3333-3333-333333333333', 'Green Road Specialist Hospital', 'Specialized Cardiac Hospital', 'Dhanmondi', 'Dhaka', 'House 6, Road 4, Dhanmondi, Dhaka 1205', 'Not provided in demo', true, 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=600'),
('a4444444-4444-4444-4444-444444444444', 'Bashundhara Medical Centre', 'Multi-disciplinary Hospital', 'Bashundhara R/A', 'Dhaka', 'Plot 81, Block E, Bashundhara R/A, Dhaka 1229', 'Not provided in demo', true, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600')
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Doctors
INSERT INTO public.doctors (id, name, title, specialty, hospital_id, fee, experience_years, avatar_url, avg_wait_time_min) VALUES
('d1111111-1111-1111-1111-111111111111', 'Dr. Sarah Rahman', 'Prof. Dr. Sarah Rahman, FCPS (Cardiology)', 'Cardiology', 'a1111111-1111-1111-1111-111111111111', 1200.00, 18, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', 8),
('d2222222-2222-2222-2222-222222222222', 'Dr. Arman Hossain', 'Dr. Arman Hossain, MD (Internal Medicine)', 'Medicine', 'a2222222-2222-2222-2222-222222222222', 1000.00, 14, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300', 7),
('d3333333-3333-3333-3333-333333333333', 'Dr. Nusrat Jahan', 'Dr. Nusrat Jahan, FCPS (Pediatrics)', 'Pediatrics', 'a3333333-3333-3333-3333-333333333333', 1000.00, 16, 'https://images.unsplash.com/photo-1594824813566-78a99427387c?auto=format&fit=crop&q=80&w=300', 6),
('d4444444-4444-4444-4444-444444444444', 'Dr. Tanvir Ahmed', 'Dr. Tanvir Ahmed, MS (Orthopedics)', 'Orthopedics', 'a4444444-4444-4444-4444-444444444444', 1500.00, 12, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300', 10)
ON CONFLICT (id) DO NOTHING;
