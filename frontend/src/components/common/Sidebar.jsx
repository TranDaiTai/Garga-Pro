"use client";
import {
  User,
  ShoppingBag,
  Star,
  CreditCard,
  Settings,
  ClipboardList,
  Calendar,
  Bell,
  Wrench,
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Shield,
  ChevronLeft,
  Phone,
  ChevronRight,
} from "lucide-react";
const UserRole = {
  USER: "USER",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
};

const Sidebar = ({
  user,
  role,
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}) => {
  const userNav = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "orders", label: "Lịch sử dịch vụ", icon: ShoppingBag },
    { id: "reviews", label: "Đánh giá của tôi", icon: Star },
    { id: "billing", label: "Thanh toán & Địa chỉ", icon: CreditCard },
    { id: "settings", label: "Cài đặt tài khoản", icon: Settings },
  ];

  const staffNav = [
    { id: "profile", label: "Hồ sơ nhân viên", icon: User },
    { id: "tasks", label: "Công việc phân công", icon: ClipboardList },
    { id: "schedule", label: "Lịch làm việc", icon: Calendar },
    { id: "status", label: "Trạng thái xử lý", icon: Wrench },
    { id: "notifications", label: "Thông báo nội bộ", icon: Bell },
  ];

  const adminNav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Quản lý người dùng", icon: Users },
    { id: "services", label: "Sản phẩm & Dịch vụ", icon: Package },
    { id: "analytics", label: "Báo cáo doanh thu", icon: BarChart3 },
    { id: "system", label: "Cấu hình hệ thống", icon: Shield },
  ];

  const getNavItems = () => {
    switch (role) {
      case UserRole.ADMIN:
        return adminNav;
      case UserRole.STAFF:
        return staffNav;
      default:
        return userNav;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <aside
        className={`
        fixed  left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
        h-[calc(100vh-4rem)] top-16
        `}
      >
        <button
          className=" 
        absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 bg-white border border-border rounded-full p-1 shadow-lg hidden md:flex
        "
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeft className="cursor-pointer" />
        </button>

        <div className="h-full flex flex-col ">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <img
              src={user.avatar || "/placeholder"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-l font-bold text-foreground tracking-tight">
                {user.name}
              </span>
              <span className="text-sm  text-muted-foreground tracking-tight">
                {user.role.toLowerCase()}
              </span>
            </div>
            <button className="relative p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1/2 -translate-y-3 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-card"></span>
            </button>
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
                  ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? "text-primary-600" : "text-gray-400"
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-4 text-primary-foreground shadow-lg">
              <p className="text-xs font-medium  mb-1">Cần hỗ trợ?</p>
              <p className="text-sm font-bold">Hotline: 1900 1234</p>
            </div>
          </div>
        </div>
      </aside>
      {!isOpen && (
        <aside
          className={`
        fixed  left-0 z-30 w-15 bg-white border-r border-gray-200 transform 
      ${
        isOpen
          ? "-translate-x-15 transition-all duration-300"
          : "translate-x-0 transition-all duration-300"
      }
        h-[calc(100vh-4rem)] top-16
        `}
        >
          <button
            className=" 
        absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 bg-white border border-border rounded-full p-1 shadow-lg hidden md:flex
        "
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight className="cursor-pointer" />
          </button>
          <div className="h-full flex flex-col">
            <div className="p-1 border-b border-border flex items-center gap-3">
              <img
                src={user.avatar || "/placeholder"}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            <nav className="flex-1 justify-center overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                  w-full flex items-center justify-center px-1 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-primary-600" : "text-gray-400"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <Phone className="mb-2" />
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
