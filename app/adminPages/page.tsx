import Image from "next/image";
import TitleTable from "@/components/titleTable";

export default function AdminPage() {
  return (
    <div>
      <div>
        <h1 className="text-6xl m-20">WELCOME ADMIN ! </h1>
      </div>
    
      <div className="mx-20 px-5">
        <TitleTable></TitleTable>
      </div>
    </div>
  );
}
