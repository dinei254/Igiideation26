import LeaderboardTable from "@/components/leaderboard-table";

export default function CreateUser() {
  return (
    <div>
      <div className="text-6xl ml-36 mt-20">Leaderboard</div>
      <div className="mx-28 my-10">
        <LeaderboardTable></LeaderboardTable>
      </div>
    </div>
  );
}
