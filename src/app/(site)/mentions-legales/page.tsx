import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergement et informations légales de Nirmie.",
};

export default function Page() {
  return <LegalPage doc="mentions" titre="Mentions légales" title="Legal notice" />;
}
