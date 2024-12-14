"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TitleDialog } from "@/components/title-dialog";
import { useState } from "react";
import { Project } from "@prisma/client";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>();
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
      }
    } catch (error: any) {
      console.error(`Failed to load projects`, error);
    } finally {
      setIsLoading(false);
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

  const handleUpdateProject = async () => {
    try {
      const formData = new FormData();
      formData.append("project", JSON.stringify(projectForm));

      const res = await fetch("/api/project", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error) {
      console.error(`Failed to create project : ${error}`);
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

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <div>
      <div className="m-20 px-5">
        <div>
          <h1 className="text-3xl">Welcome Admin! </h1>
        </div>
        <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard/projects">
                  Project Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center py-4 justify-between">
            <Input placeholder="Filter title..." className="max-w-sm" />
            <div className="flex flex-row">
              <Link href="/admin/leaderboard">
                <Button className="mr-5 text-black bg-white border-2 hover:bg-gray-200">
                  Leaderboard
                </Button>
              </Link>

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

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Create <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col justify-center items-center ">
                  <Link href="/create-user" className=" ">
                    <Button className="bg-white text-black hover:text-white px-[2rem] ">
                      User
                    </Button>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action(s)</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.titleOfInnovation}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell className="flex items-center gap-x-2">
                      <FaTrash
                        className="cursor-pointer"
                        onClick={() => handleDeleteProject(project.id)}
                      />

                      <Dialog>
                        <DialogTrigger>
                          <FaEdit />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Project</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleUpdateProject}>
                            <div>
                              <Label>Title of innovation</Label>
                              <Input
                                id="titleOfInnovation"
                                required
                                onChange={(e) => handleChangeProjectForm(e)}
                                defaultValue={project.titleOfInnovation}
                              />
                            </div>
                            <div>
                              <Label>Abstract Link</Label>
                              <Input
                                id="abstractLink"
                                onChange={(e) => handleChangeProjectForm(e)}
                                defaultValue={project.abstractLink}
                              />
                            </div>
                            <div>
                              <Label>Poster Link</Label>
                              <Input
                                id="posterLink"
                                onChange={(e) => handleChangeProjectForm(e)}
                                defaultValue={project.posterLink}
                              />
                            </div>
                            <div>
                              <Label>Video Link</Label>
                              <Input
                                id="videoLink"
                                onChange={(e) => handleChangeProjectForm(e)}
                                defaultValue={project.videoLink}
                              />
                            </div>
                            <div>
                              <Label>Supporting documents</Label>
                              <Input
                                placeholder="Supporting document 1"
                                onChange={(e) => handleChangeProjectForm(e)}
                                id="supportingDocumentLink1"
                                defaultValue={project.supportingDocumentLink1}
                              />
                              <Input
                                placeholder="Supporting document 2"
                                onChange={(e) => handleChangeProjectForm(e)}
                                id="supportingDocumentLink2"
                                defaultValue={project.supportingDocumentLink2}
                              />
                              <Input
                                placeholder="Supporting document 3"
                                id="supportingDocumentLink3"
                                onChange={(e) => handleChangeProjectForm(e)}
                                defaultValue={project.supportingDocumentLink3}
                              />
                            </div>
                            <Button className="w-full mt-5" type="submit">
                              Create Title
                            </Button>
                          </form>
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
