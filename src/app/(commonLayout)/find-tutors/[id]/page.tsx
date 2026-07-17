import TutorDetailsClient from "@/components/modules/Find-Tutors/TutorDetailsClient";
import { tutorPublicService } from "@/services/tutorPublic.Service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tutor = await tutorPublicService.getTutorDetails(id);

  const reviews = await tutorPublicService.getTutorReviews(tutor.userId);

  const categories = await tutorPublicService.getCategories();

  const allTutors = await tutorPublicService.getAllTutors();

  return (
    <TutorDetailsClient
      tutor={tutor}
      reviews={reviews}
      categories={categories}
      allTutors={allTutors}
    />
  );
}
