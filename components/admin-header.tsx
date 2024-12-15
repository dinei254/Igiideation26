import React from "react";
import Link from "next/link";

const AdminHeader = () => {
  return (
    <div className="w-full flex items-center gap-x-5 justify-center p-5 shadow-md">
      <Link href={"/admin/dashboard/projects"} className="hover:underline">
        Project Dashboard
      </Link>
      <Link href={"/admin/dashboard/users"} className="hover:underline">
        Account Dashboard
      </Link>
    </div>
  );
};

export default AdminHeader;
