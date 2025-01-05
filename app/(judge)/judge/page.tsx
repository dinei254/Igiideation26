"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { JudgeContext } from "@/hooks/JudgeProvider";
import { Project } from "@prisma/client";
import { Spinner } from "@/components/spinner-loading";
import JudgeHeader from "@/components/judge-header";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AdminPage() {
  const judge = useContext(JudgeContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProjects = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects?judgeId=${judge?.judgeId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error: any) {
      console.error(`Failed to get projects : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvaluateProject = async () => {};

  useEffect(() => {
    if (judge?.judgeId) handleGetProjects();
  }, [judge]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center">
        <Spinner className="text-black " />
      </div>
    );
  return (
    <div>
      <JudgeHeader />

      <div className="m-20">
        <h1 className="text-3xl mb-8 font-semibold">Welcome Judge!</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full">

          <div className="rounded-md">
            {projects.length <= 0 ? (
              <p className="h-screen text-center">No project assigned yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Project title</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="w-full">
                        {project.titleOfInnovation}
                      </TableCell>
                      <TableCell>
                        <Link href={`/evaluate/${project.id}`}>
                          <Button onClick={handleEvaluateProject}>
                            Evaluate
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
