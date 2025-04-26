import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, Calendar, Truck, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const testimonialRef = React.useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialRef.current) {
      const scrollAmount = 400; // Adjust scroll amount as needed
      testimonialRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Extended testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Mountain Biker",
      initials: "JD",
      review: "I was amazed at how clean my bike was after BikeWash's service. They picked it up and delivered it back looking brand new. Highly recommend!"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Road Cyclist",
      initials: "JS",
      review: "The premium wash service is worth every penny. My bike hasn't looked this good since I bought it. The team is professional and punctual."
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "BMX Enthusiast",
      initials: "MJ",
      review: "Convenient booking process and excellent service. They took care of my expensive bike with the attention it deserves. Will definitely use again!"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Professional Cyclist",
      initials: "SW",
      review: "Outstanding service! The attention to detail is remarkable. My racing bike has never performed better after their premium wash service."
    },
    {
      id: 5,
      name: "David Brown",
      role: "Cycling Instructor",
      initials: "DB",
      review: "As someone who teaches cycling, I'm very particular about bike maintenance. BikeWash exceeds my expectations every single time."
    },
    {
      id: 6,
      name: "Emma Davis",
      role: "Trail Rider",
      initials: "ED",
      review: "After intense trail rides, my bike gets pretty muddy. BikeWash does an amazing job getting it back to showroom condition."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="pt-16 bg-cover bg-center h-screen flex items-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional Bike Washing Service
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            We provide premium bike washing services at your doorstep. Your bike deserves the best care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Book a Wash Now
            </button>
            <button 
              onClick={() => {
                const howItWorksSection = document.getElementById('how-it-works');
                howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of professional bike washing services to keep your bike looking and performing at its best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Basic Wash</h3>
              <p className="text-gray-600 mb-4">
                A thorough exterior wash to remove dirt, dust, and grime from your bike's surface.
              </p>
              <p className="text-blue-500 font-semibold">Starting at $15</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Wash</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive cleaning including chain degreasing, polishing, and detailed attention to all components.
              </p>
              <p className="text-blue-500 font-semibold">Starting at $25</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup & Delivery</h3>
              <p className="text-gray-600 mb-4">
                We'll pick up your bike, wash it at our facility, and deliver it back to your doorstep.
              </p>
              <p className="text-blue-500 font-semibold">Starting at $35</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting your bike washed with us is simple and convenient. Just follow these easy steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Book a Service</h3>
                <p className="text-gray-600">
                  Choose your preferred service and schedule a convenient time for pickup.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <Calendar className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">We Pick Up</h3>
                <p className="text-gray-600">
                  Our team arrives at your location to collect your bike at the scheduled time.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <Droplet className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Wash</h3>
                <p className="text-gray-600">
                  Your bike receives a thorough cleaning by our experienced professionals.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <Truck className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">We Deliver</h3>
                <p className="text-gray-600">
                  Your clean, shiny bike is delivered back to your doorstep ready to ride.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Book a Wash Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollTestimonials('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={() => scrollTestimonials('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-50"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div 
              ref={testimonialRef}
              className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md flex-shrink-0 w-full md:w-[400px]"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 font-bold">{testimonial.initials}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;