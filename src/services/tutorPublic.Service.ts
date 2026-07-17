const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ||
  "https://skill-bridge-server-woad.vercel.app";
export const tutorPublicService = {
  async getAllTutors() {
    const res = await fetch(`${BASE_URL}/api/tutors`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  async getTutorDetails(id: string) {
    const res = await fetch(`${BASE_URL}/api/tutors/${id}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    return data?.data ?? data;
  },

  async getTutorReviews(userId: string) {
    const res = await fetch(`${BASE_URL}/api/reviews/tutor/${userId}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    return data?.data ?? [];
  },

  async getCategories() {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      next: { revalidate: 120 },
    });

    const data = await res.json();
    return data?.data ?? data;
  },
};
