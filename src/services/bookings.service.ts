import { API_BASE_URL } from "@/lib/api-base-url";
import { cookies } from "next/headers";

export async function getBookings() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/bookings`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return { success: false, data: [], message: "Failed to load bookings" };
    }

    return await res.json();
  } catch {
    return { success: false, data: [], message: "Failed to load bookings" };
  }
}
