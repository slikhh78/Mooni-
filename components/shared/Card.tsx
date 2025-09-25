
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = "bg-space-cadet/60 backdrop-blur-sm border border-celestial-blue/20 rounded-2xl shadow-lg transition-all duration-300";
  const clickableClasses = onClick ? "cursor-pointer hover:border-celestial-blue/50 hover:bg-space-cadet/90" : "";
  
  return (
    <div className={`${baseClasses} ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
