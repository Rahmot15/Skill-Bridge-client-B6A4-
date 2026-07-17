import TutorAvailability from "@/components/modules/Dashboard/Tutor/TutorAvailability";
import { tutorService } from "@/services/tutor.service";

export default async function TutorAvailabilityPage() {
  const res = await tutorService.getMyProfile();

  const tutor = res?.data;

  if (!tutor) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-red-500">
          Tutor profile not found
        </h2>
        <p className="text-sm text-zinc-500">
          Please create your tutor profile first.
        </p>
      </div>
    );
  }

  return <TutorAvailability tutor={tutor} />;
}
