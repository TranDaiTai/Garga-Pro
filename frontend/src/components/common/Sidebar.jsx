import React from 'react';
import { 
  User, ShoppingBag, Star, CreditCard, Settings, 
  ClipboardList, Calendar, Bell, Wrench, 
  LayoutDashboard, Users, Package, BarChart3, Shield
} from 'lucide-react';
const UserRole = {
  USER: 'USER',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN'
};

const Sidebar = ({ role, activeTab, setActiveTab, isOpen }) => {
  
  const userNav = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: User },
    { id: 'orders', label: 'Lịch sử dịch vụ', icon: ShoppingBag },
    { id: 'reviews', label: 'Đánh giá của tôi', icon: Star },
    { id: 'billing', label: 'Thanh toán & Địa chỉ', icon: CreditCard },
    { id: 'settings', label: 'Cài đặt tài khoản', icon: Settings },
  ];

  const staffNav = [
    { id: 'profile', label: 'Hồ sơ nhân viên', icon: User },
    { id: 'tasks', label: 'Công việc phân công', icon: ClipboardList },
    { id: 'schedule', label: 'Lịch làm việc', icon: Calendar },
    { id: 'status', label: 'Trạng thái xử lý', icon: Wrench },
    { id: 'notifications', label: 'Thông báo nội bộ', icon: Bell },
  ];

  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'services', label: 'Sản phẩm & Dịch vụ', icon: Package },
    { id: 'analytics', label: 'Báo cáo doanh thu', icon: BarChart3 },
    { id: 'system', label: 'Cấu hình hệ thống', icon: Shield },
  ];

  const getNavItems = () => {
    switch (role) {
      case UserRole.ADMIN: return adminNav;
      case UserRole.STAFF: return staffNav;
      default: return userNav;
    }
  };

  const navItems = getNavItems();

  return (
    <aside className={`
      sticky inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0
    `}>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Wrench className="text-white w-5 h-5" />
            </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Garage Đại Lộc</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-4 text-white">
                <p className="text-xs font-medium opacity-80 mb-1">Cần hỗ trợ?</p>
                <p className="text-sm font-bold">Hotline: 1900 1234</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;