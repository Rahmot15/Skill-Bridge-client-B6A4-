import StudentDashboard from "@/components/modules/Dashboard/Student/StudentDashboard";
import { getBookings } from "@/services/bookings.service";

export default async function StudentDashboardPage() {
  const res = await getBookings();
  if (!res?.success) {
    return <div>Error loading bookings</div>;
  }
  const bookings = res?.data || [];

  return <StudentDashboard bookings={bookings} />;
}
