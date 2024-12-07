import Image from "next/image";
import Link from "next/link";
import LeaderboardTable from "@/components/leaderboardTable";
import TitleForm from "@/components/titleForm";

export default function CreateUser() {
  return (
    <div>
      <div className="text-6xl ml-36 mt-20">Leaderboard</div>
      <div className="mx-28 my-10">
        <LeaderboardTable></LeaderboardTable>
      </div>
        <TitleForm></TitleForm>
    </div>
  );
}
