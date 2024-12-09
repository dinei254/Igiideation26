import Image from "next/image";
import TitleTableJudge from "@/components/title-table-judge";

export default function AdminPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl m-20">WELCOME JUDGES </h1>
      </div>
    
      <div className="mx-20 px-5">
        <TitleTableJudge/>
      </div>
    </div>
  );
}
