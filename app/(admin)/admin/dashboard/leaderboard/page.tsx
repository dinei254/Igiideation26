"use client";

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
import { useEffect, useState } from "react";
import { ProjectAndJudgeProjectBridge } from "@/util/type";
import { Judge } from "@prisma/client";
import LeaderboardTableRow from "./LeaderboardTableRow";

export default function CreateUser() {
  const [projects, setProjects] = useState<ProjectAndJudgeProjectBridge[]>();
  const [judges, setJudges] = useState<Judge[]>();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllProjects = async () => {
    try {
      const res = await fetch("/api/projects", { method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error: any) {
      console.error(`Failed to get all projects : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetJudges = async () => {
    try {
      const res = await fetch("/api/judges", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setJudges(data);
      }
    } catch (error: any) {
      console.error(`Failed to get judegs :${error}`);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await handleGetAllProjects();
      await handleGetJudges();
    };
    getData();
  }, []);

  if (isLoading) return <p>Loading data ..</p>;
  else
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

          <div className="mt-10">
            <h2 className="text-2xl">Statistics</h2>
            <Table className="w-1/3">
              <TableHeader className="border">
                <TableRow>
                  <TableHead>Stats</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total projects</TableCell>
                  <TableCell>{projects?.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total judges</TableCell>
                  <TableCell>{judges?.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="w-full mt-10">
            {/* the table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Judge 1</TableHead>
                  <TableHead>Judge 2</TableHead>
                  <TableHead>Judge 3</TableHead>
                  <TableHead>Judge 4</TableHead>
                  <TableHead>Judge 5</TableHead>
                  <TableHead>Average marks</TableHead>
                  <TableHead>Remark</TableHead>
                </TableHeader>
                <TableBody>
                  {projects?.map((project) => (
                    <LeaderboardTableRow key={project.id} project={project} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
}
