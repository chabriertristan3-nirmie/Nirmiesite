import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation de l'application Nirmie.",
};

export default function Page() {
  return <LegalPage doc="cgu" titre="Conditions d'utilisation" title="Terms of Use" />;
}
