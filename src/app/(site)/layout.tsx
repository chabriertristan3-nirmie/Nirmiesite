import "@/styles/pages.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Particles from "@/components/Particles";
import SiteEffects from "@/components/SiteEffects";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Particles />
      <SiteHeader />
      {children}
      <SiteFooter />
      <SiteEffects />
    </>
  );
}
