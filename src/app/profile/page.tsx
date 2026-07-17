import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
  const session = await getServerSession();
  const role = session?.user?.role;

  if (role === "TUTOR") {
    redirect("/tutor-dashboard/profile");
  }

  if (role === "ADMIN") {
    redirect("/admin-dashboard");
  }

  redirect("/dashboard/profile");
}
