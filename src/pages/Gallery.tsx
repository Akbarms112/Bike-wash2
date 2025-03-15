import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Professional Bike Washing",
      description: "Expert cleaning with attention to every detail"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1601924357840-3e50ad4dd9fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Specialized Equipment",
      description: "Using professional-grade cleaning tools"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1605164599901-f0475a9f7309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Deep Cleaning Process",
      description: "Thorough cleaning of all components"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1599236449650-e512da4c3e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Premium Service",
      description: "Top-tier washing and maintenance"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Expert Team",
      description: "Skilled professionals at your service"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1607165398762-b31af7c4b2b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Quality Inspection",
      description: "Thorough quality checks before delivery"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Eco-Friendly Products",
      description: "Using environmentally conscious cleaning solutions"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1532505692610-19cb62a53c81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Customer Satisfaction",
      description: "Delivering excellence in every service"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1603521767936-c5f3cc929de5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Modern Facilities",
      description: "State-of-the-art washing facilities"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a look at our professional bike washing service in action. We take pride in delivering the highest quality care for your bikes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div 
                key={item.id}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-200">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;