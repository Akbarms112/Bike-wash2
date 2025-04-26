import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

interface LocationData {
  village?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          );
          const data = await response.json();
          
          setLocationData({
            village: data.address.village || data.address.suburb || data.address.town,
            city: data.address.city || data.address.county,
            state: data.address.state,
            country: data.address.country,
            postcode: data.address.postcode
          });
        } catch (error) {
          setLocationError('Failed to fetch location details');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setLocationLoading(false);
      }
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login process
      setTimeout(() => {
        // Create mock user data
        const userData = {
          id: '123456',
          name: 'Demo User',
          email: loginMethod === 'email' ? email : `${phone}@phone.user`,
          isAdmin: false
        };
        
        login(userData);
        setIsLoading(false);
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Create mock admin user data
      const userData = {
        id: 'admin123',
        name: 'Admin User',
        email: 'admin@example.com',
        isAdmin: true
      };
      
      login(userData);
      setIsLoading(false);
      navigate('/admin-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Location Display */}
        <div className="w-full max-w-md mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Your Location</h3>
          </div>
          
          {locationLoading ? (
            <div className="flex items-center justify-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Detecting location...</span>
            </div>
          ) : locationError ? (
            <div className="text-red-500 text-sm py-2">{locationError}</div>
          ) : locationData ? (
            <div className="text-gray-600">
              {[
                locationData.village,
                locationData.city,
                locationData.state,
                locationData.country,
                locationData.postcode
              ]
                .filter(Boolean)
                .join(', ')}
            </div>
          ) : null}
        </div>

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Logo className="h-12 w-auto" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  loginMethod === 'email'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  loginMethod === 'phone'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Phone className="h-5 w-5 mr-2" />
                Phone
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginMethod === 'email' ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign in
                    </span>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">For demo purposes only</p>
              <button
                onClick={handleAdminLogin}
                className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;