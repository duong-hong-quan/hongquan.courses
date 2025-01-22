"use client";
import { RBACTable } from "@/components/rbac-table";

export default function MemberPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-darkgreen ">
        Phân quyền và vai trò
      </h1>
      <p className="text-darkgreen">
        Quản lý vai trò và quyền của người dùng đối với ứng dụng của bạn.
      </p>
      <RBACTable />
    </div>
  );
}
