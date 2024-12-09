import Image from "next/image";
import TitleTable from "@/components/title-table";

export default function AdminPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl mt-28 ml-28">WELCOME ADMIN ! </h1>
      </div>
    
      <div className="mx-20 px-5">
        <TitleTable></TitleTable>
      </div>
    </div>
  );
}
