import Image from "next/image";
import TitleTable from "@/components/title-table";

export default function AdminPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl m-20">WELCOME ADMIN ! </h1>
      </div>
    
      <div className="mx-20 px-5">
        <TitleTable></TitleTable>
      </div>
    </div>
  );
}
