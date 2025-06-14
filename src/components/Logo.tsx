import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <img 
      src="./src/assets/images/bikewash_logo.png"
      alt="BikeWash Logo"
      className={className}
    />
  );
};

export default Logo;
