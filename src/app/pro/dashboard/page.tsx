import type { Metadata } from "next";
import { getDashboardData } from "@/lib/data";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Tableau de bord — Espace pro",
};

export default async function DashboardPage() {
  const data = await getDashboardData("pontoise");
  return <DashboardClient data={data} />;
}
