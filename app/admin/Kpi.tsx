import { DashboardCard } from "@/components/DashboardCard";
import { Users, Activity, GraduationCap } from "lucide-react";
import { DollarSign, LucideIcon } from "lucide-react"

export const data = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    Icon: DollarSign,
    percentage: "+20.1% from last month",
  },
  {
    title: "Teachers",
    value: "+2350",
    Icon: Users,
    percentage: "+180.1% from last month",
  },
  {
    title: "Students",
    value: "+12,234",
    Icon: GraduationCap,
    percentage: "+19% from last month",
  },
  {
    title: "Attendence",
    value: "+573",
    Icon: Activity,
    percentage: "+201 since last hour",
  },
];

export default function KpiCardList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {data.map((item, index) => (
        <DashboardCard
          key={index}
          title={item.title}
          value={item.value}
          Icon={item.Icon}
          percentage={item.percentage}
        />
      ))}
    </div>
  );
}



