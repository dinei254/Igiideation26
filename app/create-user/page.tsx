import Image from "next/image";
import Link from "next/link";
import UserTable from "@/components/user-table";

export default function CreateUser() {
  return (
    <div>
      <div>
        <h1 className="text-6xl m-20 pl-10">List of User :  </h1>
      </div>
      <div className="mx-28 my-10">
        <UserTable></UserTable>
      </div>
    </div>
  );
}
