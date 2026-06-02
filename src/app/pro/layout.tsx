import "@/styles/pro.css";
import ProBodyClass from "@/components/ProBodyClass";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProBodyClass />
      {children}
    </>
  );
}
