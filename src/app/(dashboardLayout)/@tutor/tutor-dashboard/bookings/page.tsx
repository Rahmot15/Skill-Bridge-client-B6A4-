import TutorBookings from "@/components/modules/Dashboard/Tutor/TutorBookings";
import { tutorService } from "@/services/tutor.service";

export default async function TutorBookingsPage() {
  const res = await tutorService.getTutorBookings();

  const bookings = res?.success ? res.data : [];

  return <TutorBookings bookings={bookings} />;
}
