import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment l'application Nirmie traite tes données personnelles.",
};

export default function Page() {
  return <LegalPage doc="confidentialite" titre="Politique de confidentialité" title="Privacy Policy" />;
}
