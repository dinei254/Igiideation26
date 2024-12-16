import LeaderboardTable from "@/components/leaderboard-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AdminHeader from "@/components/admin-header";

export default function CreateUser() {
  return (
    <div>
      <AdminHeader />
      <div className="m-20">
        <h1 className="text-3xl">Leaderboard</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/leaderboard">
                Leaderboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full mt-10">
          {/* the table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableHead>Project Title</TableHead>
                <TableHead>Average marks</TableHead>
              </TableHeader>
              <TableBody></TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
