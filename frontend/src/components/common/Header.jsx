import React from 'react';
import { Bell, Search, Menu, LogOut, User } from 'lucide-react';
const UserRole = {
  USER: 'USER',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN'
};

const Header = ({ user, toggleSidebar, onSwitchRole }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Search Bar - Hidden on mobile for space */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64 lg:w-96">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
                type="text" 
                placeholder="Tìm kiếm đơn hàng, dịch vụ..." 
                className="bg-transparent border-none outline-none text-sm text-gray-700 w-full placeholder-gray-400"
            />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Role Switcher for Demo Purposes */}
        <div className="hidden sm:flex items-center space-x-2 mr-4 bg-gray-50 p-1 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-500 px-2">View as:</span>
            {(Object.keys(UserRole)).map((roleKey) => (
                <button
                    key={roleKey}
                    onClick={() => onSwitchRole(UserRole[roleKey])}
                    className={`
                        text-xs font-medium px-3 py-1 rounded transition-all
                        ${user.role === UserRole[roleKey] 
                            ? 'bg-white text-primary-700 shadow-sm border border-gray-200' 
                            : 'text-gray-500 hover:text-gray-900'}
                    `}
                >
                    {roleKey}
                </button>
            ))}
        </div>

        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover"/> : <User size={18}/>}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;