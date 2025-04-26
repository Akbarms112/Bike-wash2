import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Truck, Package, Bike } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServiceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleServiceSelect = (type: string) => {
    navigate(`/dashboard?type=${type}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our range of professional bike washing services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <button
              onClick={() => handleServiceSelect('pickup')}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-left ${
                location.pathname === '/services/pickup' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-blue-500" />
                <h2 className="text-xl font-semibold ml-3">Pickup Only</h2>
              </div>
              <p className="text-gray-600">We'll pick up your bike from your location.</p>
            </button>

            <button
              onClick={() => handleServiceSelect('drop')}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-left ${
                location.pathname === '/services/drop' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <Bike className="h-8 w-8 text-blue-500" />
                <h2 className="text-xl font-semibold ml-3">Drop Only</h2>
              </div>
              <p className="text-gray-600">Drop your bike at our center for washing.</p>
            </button>

            <button
              onClick={()=> handleServiceSelect('pickupDrop')}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-left ${
                location.pathname === '/services/pickup-drop' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-blue-500" />
                <h2 className="text-xl font-semibold ml-3">Pickup & Drop</h2>
              </div>
              <p className="text-gray-600">Complete service with pickup and delivery.</p>
            </button>
          </div>

          {children}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const PickupService: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-6">Pickup Service</h2>
    <div className="space-y-6">
      <p className="text-gray-600">
        Our pickup service is designed for your convenience. We'll collect your bike from your location
        and transport it to our washing center.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Professional bike handling</li>
            <li>Secure transportation</li>
            <li>Flexible pickup timing</li>
            <li>Real-time tracking</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Pricing</h3>
          <p className="text-gray-600">Starting from ₹299</p>
          <p className="text-sm text-gray-500 mt-2">
            *Price varies based on location and bike size
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DropService: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-6">Drop Service</h2>
    <div className="space-y-6">
      <p className="text-gray-600">
        Drop your bike at our center and we'll take care of the rest. Perfect for those who prefer
        to bring their bikes themselves.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>No pickup charges</li>
            <li>Flexible timing</li>
            <li>Quick service</li>
            <li>Secure storage</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Pricing</h3>
          <p className="text-gray-600">Starting from ₹299</p>
          <p className="text-sm text-gray-500 mt-2">
            *Basic wash package
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PickupDropService: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-6">Pickup & Drop Service</h2>
    <div className="space-y-6">
      <p className="text-gray-600">
        Our complete service package includes both pickup and delivery. We'll handle everything
        from collection to return delivery.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Door-to-door service</li>
            <li>Professional handling</li>
            <li>Scheduled timing</li>
            <li>Real-time updates</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Pricing</h3>
          <p className="text-gray-600">Starting from ₹499</p>
          <p className="text-sm text-gray-500 mt-2">
            *Includes pickup and delivery charges
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ServiceLayout>
            <div className="text-center text-gray-600">
              Please select a service type above to view more details.
            </div>
          </ServiceLayout>
        }
      />
      <Route
        path="/pickup"
        element={
          <ServiceLayout>
            <PickupService />
          </ServiceLayout>
        }
      />
      <Route
        path="/drop"
        element={
          <ServiceLayout>
            <DropService />
          </ServiceLayout>
        }
      />
      <Route
        path="/pickup-drop"
        element={
          <ServiceLayout>
            <PickupDropService />
          </ServiceLayout>
        }
      />
    </Routes>
  );
};

export default Services;