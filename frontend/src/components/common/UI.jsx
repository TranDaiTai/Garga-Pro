import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

export const Badge = ({ status }) => {
  let colorClass = 'bg-gray-100 text-gray-800';
  
  switch (status) {
    case 'Completed':
    case 'Done':
      colorClass = 'bg-green-100 text-green-700';
      break;
    case 'Pending':
    case 'Todo':
      colorClass = 'bg-yellow-100 text-yellow-700';
      break;
    case 'In Progress':
      colorClass = 'bg-blue-100 text-blue-700';
      break;
    case 'Cancelled':
    case 'High':
      colorClass = 'bg-red-100 text-red-700';
      break;
    case 'Medium':
      colorClass = 'bg-orange-100 text-orange-700';
      break;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};