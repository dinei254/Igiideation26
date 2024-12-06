import Image from "next/image";
import Link from "next/link";
import UserTable from "@/components/userTable";

export default function CreateUser() {
  return (
    <div>
      <div className="text-6xl ml-36 mt-32">
        List of User : 
      </div>
      <div className="mx-28 my-10">
        <UserTable></UserTable>
      </div>
    </div>
  );
}
