/*
  # Initial database schema for bike wash service

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - password (text)
      - name (text)
      - phone (text)
      - address (text)
      - is_admin (boolean)
      - created_at (timestamp)

    - bikes
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - name (text)
      - number (text)
      - color (text)
      - created_at (timestamp)

    - wash_centers
      - id (uuid, primary key)
      - name (text)
      - address (text)
      - rating (numeric)
      - distance (text)
      - price (numeric)
      - created_at (timestamp)

    - bookings
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - bike_id (uuid, foreign key)
      - wash_center_id (uuid, foreign key)
      - status (text)
      - pickup_time (timestamp)
      - dropoff_time (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  phone text,
  address text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create bikes table
CREATE TABLE IF NOT EXISTS bikes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  number text NOT NULL,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Create wash_centers table
CREATE TABLE IF NOT EXISTS wash_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  rating numeric DEFAULT 0,
  distance text,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  bike_id uuid REFERENCES bikes(id) ON DELETE CASCADE,
  wash_center_id uuid REFERENCES wash_centers(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  pickup_time timestamptz,
  dropoff_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wash_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own bikes"
  ON bikes
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own bikes"
  ON bikes
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view wash centers"
  ON wash_centers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert some initial wash centers
INSERT INTO wash_centers (name, address, rating, distance, price) VALUES
  ('Downtown Bike Spa', '123 Main St, Downtown', 4.8, '1.2 km', 25),
  ('Uptown Bike Wash', '456 Oak Ave, Uptown', 4.5, '2.5 km', 20),
  ('Riverside Bike Care', '789 River Rd, Riverside', 4.9, '3.7 km', 30),
  ('Hillside Bike Cleaners', '101 Hill St, Hillside', 4.6, '4.1 km', 22);