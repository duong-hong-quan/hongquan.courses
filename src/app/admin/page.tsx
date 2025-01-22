import { DashboardOverview } from "@/components/dashboard-overview";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-darkgreen">
        Trang tổng quan hệ thống
      </h1>
      <DashboardOverview />
    </div>
  );
}
