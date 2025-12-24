import React, { useState, useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import {
  UserDashboard,
  StaffDashboard,
  AdminDashboard,
} from "@/components/common/RoleDashboards";
import { Breadcrumb } from "@/components/common/Breadcrumb";

const UserRole = {
  USER: "USER",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
};
// Mock Data Factories
const getMockUser = (role) => {
  const base = {
    id: "123",
    email: "user@example.com",
    phone: "0909 123 456",
    joinDate: "12/2023",
    avatar: "https://picsum.photos/200",
  };

  switch (role) {
    case UserRole.ADMIN:
      return {
        ...base,
        name: "Admin Quản Trị",
        role: UserRole.ADMIN,
        avatar: "https://picsum.photos/200?random=1",
      };
    case UserRole.STAFF:
      return {
        ...base,
        name: "Kỹ Thuật Viên Tùng",
        role: UserRole.STAFF,
        avatar: "https://picsum.photos/200?random=2",
      };
    default:
      return {
        ...base,
        name: "Nguyễn Văn Khách",
        role: UserRole.USER,
        address: "123 Đường 3/2, Quận 10, TP.HCM",
        avatar: "https://picsum.photos/200?random=3",
      };
  }
};

const ProfilePage = () => {
  const [currentRole, setCurrentRole] = useState("USER");
  const [currentUser, setCurrentUser] = useState(getMockUser("USER"));
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update mock user when role changes
  useEffect(() => {
    setCurrentUser(getMockUser(currentRole));
    // Reset tab when switching roles to avoid dead ends
    if (currentRole === UserRole.ADMIN) setActiveTab("dashboard");
    else if (currentRole === UserRole.STAFF) setActiveTab("tasks");
    else setActiveTab("profile");
  }, [currentRole]);

  const renderContent = () => {
    // This is a simple router-like switch. In a real ProfilePage, use React Router.
    switch (currentRole) {
      case UserRole.USER:
        return <UserDashboard user={currentUser} />;
      case UserRole.STAFF:
        return <StaffDashboard user={currentUser} />;
      case UserRole.ADMIN:
        return <AdminDashboard user={currentUser} />;
      default:
        return <div>Unknown Role</div>;
    }
  };

  return (
    <>
      <Breadcrumb></Breadcrumb>
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
        {/* Sidebar Navigation */}
        <Sidebar
          role={currentRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <Header
            user={currentUser}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onSwitchRole={setCurrentRole}
          />

          {/* Scrollable Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {/* Map tab ID to readable title roughly */}
                    {activeTab === "profile" && "Hồ sơ cá nhân"}
                    {activeTab === "dashboard" && "Dashboard Tổng Quan"}
                    {activeTab === "orders" && "Lịch sử đơn hàng"}
                    {activeTab === "tasks" && "Công việc của tôi"}
                    {!["profile", "dashboard", "orders", "tasks"].includes(
                      activeTab
                    ) && "Chi tiết mục"}
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Quản lý thông tin và hoạt động của bạn tại Garage Đại Lộc.
                  </p>
                </div>

                {currentRole === UserRole.USER && (
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors hidden sm:block">
                    Đặt lịch dịch vụ mới
                  </button>
                )}
              </div>

              {renderContent()}
            </div>
          </main>
        </div>

        {/* Mobile Overlay for Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
