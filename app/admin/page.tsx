import { PROJECTS, STACK, VALUES, SOCIALS, CERTS, SITE } from "@/lib/data";
import AdminDashboard from "./AdminDashboard";

export const metadata = { title: "Admin — SUY0G.99" };

export default function AdminPage() {
  return (
    <AdminDashboard
      projects={PROJECTS}
      stack={STACK}
      values={VALUES}
      socials={SOCIALS}
      certs={CERTS}
      site={SITE}
    />
  );
}
