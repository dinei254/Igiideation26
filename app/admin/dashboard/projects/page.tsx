"use client";

import { FaUserCheck } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Judge, Project } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdminHeader from "@/components/admin-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ImCross } from "react-icons/im";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>();
  const [judges, setJudges] = useState<Judge[]>();
  const [selectedJudgesName, setSelectedJudgesName] = useState<Judge[]>([]);
  const [selectedJudges, setSelectedJudges] = useState<Judge[]>([]);
  const [projectForm, setProjectForm] = useState({
    titleOfInnovation: "",
    abstractLink: "",
    posterLink: "",
    videoLink: "",
    supportingDocument1: "",
    supportingDocument2: "",
    supportingDocument3: "",
  });

  const [updatedProjectForm, setUpdatedProjectForm] = useState({
    titleOfInnovation: "",
    abstractLink: "",
    posterLink: "",
    videoLink: "",
    supportingDocument1: "",
    supportingDocument2: "",
    supportingDocument3: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleGetProjects = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/projects", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        setUpdatedProjectForm(data);
      }
    } catch (error: any) {
      console.error(`Failed to load projects`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetJudges = async () => {
    try {
      const res = await fetch("/api/judges", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setJudges(data);
      }
    } catch (error) {
      console.error(`Failed to get judges : ${error}`);
    }
  };

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("project", JSON.stringify(projectForm));

      const res = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error) {
      console.error(`Failed to create project : ${error}`);
    }
  };

  const handleChangeProjectForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProjectForm({
      ...projectForm,
      [id]: value,
    });
  };

  const handleUpdateProjectForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedProjectForm({
      ...projectForm,
      [id]: value,
    });
  };

  const handleUpdateProject = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("project", JSON.stringify(updatedProjectForm));
      formData.append("id", id);

      const res = await fetch("/api/project", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error) {
      console.error(`Failed to update project : ${error}`);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const formdata = new FormData();
    formdata.append("id", id);

    const res = await fetch("/api/project", {
      method: "DELETE",
      body: formdata,
    });

    if (res.ok) {
      location.reload();
    }
    try {
    } catch (error: any) {
      console.error(`Failed to delete project : ${error}`);
    }
  };

  const handleAssignJudges = async (projectId: string) => {
    try {
      const formdata = new FormData();
      formdata.append("judges", JSON.stringify(selectedJudges));
      formdata.append("projectId", projectId);

      const res = await fetch("/api/assign-judge", {
        method: "POST",
        body: formdata,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to assign judges : ${error}`);
    }
  };

  useEffect(() => {
    async function getData() {
      await handleGetProjects();
      await handleGetJudges();
    }

    getData();
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="m-20 px-5">
        <h1 className="text-2xl mb-5 font-semibold">Projects Dashboard</h1>
        <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard/projects">
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center py-4 justify-between">
            <Input placeholder="Filter title..." className="max-w-sm" />
            <div className="flex flex-row">
              <Button
                className="mr-5 text-black bg-white border-2 hover:bg-gray-200"
                asChild
              >
                <Link href="/admin/dashboard/leaderboard">Leaderboard</Link>
              </Button>

              <Dialog>
                <DialogTrigger className="bg-primary text-secondary font-semibold rounded-md p-1 px-2">
                  Create Title
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateProject}>
                    <div>
                      <Label>Title of innovation</Label>
                      <Input
                        id="titleOfInnovation"
                        required
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Abstract Link</Label>
                      <Input
                        id="abstractLink"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Poster Link</Label>
                      <Input
                        id="posterLink"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Video Link</Label>
                      <Input
                        id="videoLink"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <div>
                      <Label>Supporting documents</Label>
                      <Input
                        placeholder="Supporting document 1"
                        onChange={(e) => handleChangeProjectForm(e)}
                        id="supportingDocumentLink1"
                      />
                      <Input
                        placeholder="Supporting document 2"
                        onChange={(e) => handleChangeProjectForm(e)}
                        id="supportingDocumentLink2"
                      />
                      <Input
                        placeholder="Supporting document 3"
                        id="supportingDocumentLink3"
                        onChange={(e) => handleChangeProjectForm(e)}
                      />
                    </div>
                    <Button className="w-full mt-5" type="submit">
                      Create Title
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Judges assigned</TableHead>
                  <TableHead>Action(s)</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.titleOfInnovation}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>
                      {project.assignedJudges?.length || 0} judge(s)
                    </TableCell>
                    <TableCell className="flex items-center gap-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <FaTrash
                              className="cursor-pointer"
                              onClick={() => handleDeleteProject(project.id)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete project</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Dialog>
                        <DialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <FaEdit className="cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit project</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Project</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => handleUpdateProject(e, project.id)}
                          >
                            <div>
                              <Label>Title of innovation</Label>
                              <Input
                                id="titleOfInnovation"
                                required
                                onChange={(e) => handleUpdateProjectForm(e)}
                                defaultValue={project.titleOfInnovation}
                              />
                            </div>
                            <div>
                              <Label>Abstract Link</Label>
                              <Input
                                id="abstractLink"
                                onChange={(e) => handleUpdateProjectForm(e)}
                                defaultValue={project.abstractLink}
                              />
                            </div>
                            <div>
                              <Label>Poster Link</Label>
                              <Input
                                id="posterLink"
                                onChange={(e) => handleUpdateProjectForm(e)}
                                defaultValue={project.posterLink}
                              />
                            </div>
                            <div>
                              <Label>Video Link</Label>
                              <Input
                                id="videoLink"
                                onChange={(e) => handleUpdateProjectForm(e)}
                                defaultValue={project.videoLink}
                              />
                            </div>
                            <div>
                              <Label>Supporting documents</Label>
                              <Input
                                placeholder="Supporting document 1"
                                onChange={(e) => handleUpdateProjectForm(e)}
                                id="supportingDocumentLink1"
                                defaultValue={project.supportingDocumentLink1}
                              />
                              <Input
                                placeholder="Supporting document 2"
                                onChange={(e) => handleUpdateProjectForm(e)}
                                id="supportingDocumentLink2"
                                defaultValue={project.supportingDocumentLink2}
                              />
                              <Input
                                placeholder="Supporting document 3"
                                id="supportingDocumentLink3"
                                onChange={(e) => handleUpdateProjectForm(e)}
                                defaultValue={project.supportingDocumentLink3}
                              />
                            </div>
                            <Button className="w-full mt-5" type="submit">
                              Create Title
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <FaUserCheck className="cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Assign Mentor</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Judges</DialogTitle>
                            <DialogDescription>
                              Choose judges to be assigned to project "
                              {project.titleOfInnovation}"
                            </DialogDescription>
                          </DialogHeader>
                          <Select
                            onValueChange={(value) => {
                              const parsedJudge = JSON.parse(value);
                              if (
                                selectedJudges.find(
                                  (judge) => judge.name === parsedJudge.name
                                ) === undefined
                              )
                                setSelectedJudges([
                                  ...selectedJudges!,
                                  parsedJudge,
                                ]);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select judges" />
                            </SelectTrigger>
                            <SelectContent>
                              {judges?.map((judge) => (
                                <SelectItem
                                  key={judge.id}
                                  value={JSON.stringify(judge)}
                                >
                                  {judge.name} (Currently judging :{" "}
                                  {judge.projectToBeJudged?.length || 0}{" "}
                                  project)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="mt-3 flex-wrap ">
                            {selectedJudges?.map((judge) => (
                              <Badge key={judge.id} className="mx-1">
                                {judge.name}{" "}
                                <ImCross
                                  size={6}
                                  className="ml-2 cursor-pointer"
                                  onClick={() => {
                                    const filteredJudges =
                                      selectedJudges.filter(
                                        (currentJudge) =>
                                          currentJudge.id !== judge.id
                                      );
                                    setSelectedJudges(filteredJudges);
                                  }}
                                />
                              </Badge>
                            ))}
                          </div>
                          <Button
                            className="w-full mt-5"
                            onClick={() => handleAssignJudges(project.id)}
                          >
                            Assign Mentors
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
