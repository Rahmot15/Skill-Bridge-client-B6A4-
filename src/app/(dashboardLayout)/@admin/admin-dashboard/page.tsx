import AdminDashboard from "@/components/modules/Dashboard/Admin/AdminDashboard";
import { adminService } from "@/services/admin.service";

export default async function AdminDashboardPage() {
  const statsRes = await adminService.getStats();
  const bookingsRes = await adminService.getBookings();

  const stats = statsRes?.data || {
    totalUsers: 0,
    totalTutors: 0,
    totalStudents: 0,
    totalBookings: 0,
    totalCategories: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    rejectedBookings: 0,
    cancelledBookings: 0,
  };
  const bookings = bookingsRes?.data || [];

  return <AdminDashboard stats={stats} bookings={bookings} />;
}
