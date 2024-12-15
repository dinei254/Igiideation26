"use client";

import AdminHeader from "@/components/admin-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Admin, Judge } from "@prisma/client";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UsersDashboardPage = () => {
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [updatedAdminForm, setUpdatedAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [judgeForm, setJudgeForm] = useState({
    name: "",
    email: "",
    association: "",
    password: "",
  });

  const [updatedJudgeForm, setUpdatedJudgeForm] = useState({
    name: "",
    email: "",
    association: "",
    password: "",
  });

  const [admins, setAdmins] = useState<Admin[]>();
  const [judges, setJudges] = useState<Judge[]>();

  const handleChangeAdminForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdminForm({
      ...adminForm,
      [id]: value,
    });
  };

  const handleChangeUpdatedAdminForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedAdminForm({
      ...adminForm,
      [id]: value,
    });
  };

  const handleChangeJudgeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setJudgeForm({
      ...judgeForm,
      [id]: value,
    });
  };

  const handleChangeUpdatedJudgeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedJudgeForm({
      ...judgeForm,
      [id]: value,
    });
  };

  const handleCreateAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", adminForm.name);
      formData.append("email", adminForm.email);
      formData.append("password", adminForm.password);
      formData.append("type", "ADMIN");

      const res = await fetch("/api/user/create", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to create admin account : ${error}`);
    }
  };

  const handleCreateJudge = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData();
      formData.append("name", judgeForm.name);
      formData.append("email", judgeForm.email);
      formData.append("password", judgeForm.password);
      formData.append("type", "JUDGE");
      formData.append("association", judgeForm.association);

      const res = await fetch("/api/user/create", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to create judge account : ${error}`);
    }
  };

  const handleDeleteJudge = async (judgeId: string) => {
    try {
      const formdata = new FormData();
      formdata.append("judgeId", judgeId);

      const res = await fetch("/api/judge", {
        method: "DELETE",
        body: formdata,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to delete judge account : ${error}`);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      const formdata = new FormData();
      formdata.append("adminId", adminId);

      const res = await fetch("/api/admin", {
        method: "DELETE",
        body: formdata,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to delete admin account : ${error}`);
    }
  };

  const handleGetAdmins = async () => {
    try {
      const res = await fetch("/api/admins", { method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (error: any) {
      console.error(`Failed to get admin accounts : ${error}`);
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
      console.error(`Failed to get judge accounts :${error}`);
    }
  };

  useEffect(() => {
    async function getData() {
      await handleGetAdmins();
      await handleGetJudges();
    }

    getData();
  }, []);

  // const handleCreateJudge = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", adminForm.name);
  //     formData.append("email", adminForm.email);
  //     formData.append("password", adminForm.password);
  //     formData.append("type", "ADMIN");

  //   } catch (error: any) {
  //     console.error(`Failed to create judge account :${error}`);
  //   }
  // };

  return (
    <div>
      <AdminHeader />
      <div className="m-20 px-5">
        <h1 className="text-2xl font-semibold mb-5">Users Dashboard</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/users">
                Users
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center py-4 justify-between">
          <Input placeholder="Filter User..." className="max-w-sm" />
          <div className="flex gap-x-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  // variant="outline"
                  className="bg-black text-white hover:text-white"
                >
                  Create Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Admin</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateAdmin}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      required
                      id="name"
                      onChange={(e) => handleChangeAdminForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      required
                      id="email"
                      onChange={(e) => handleChangeAdminForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      required
                      id="password"
                      onChange={(e) => handleChangeAdminForm(e)}
                    />
                  </div>

                  <Button className="w-full mt-5">Create Admin</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  // variant="outline"
                  className="bg-black text-white hover:text-white"
                >
                  Create Judge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Judge</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateJudge}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      required
                      id="name"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      required
                      id="email"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Association</Label>
                    <Input
                      required
                      id="association"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      required
                      id="password"
                      onChange={(e) => handleChangeJudgeForm(e)}
                    />
                  </div>

                  <Button className="w-full mt-5">Create Admin</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* the table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Action(s)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins?.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell className="font-semibold">ADMIN</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaTrash
                            className="cursor-pointer"
                            onClick={() => handleDeleteAdmin(admin.id)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete admin account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaEdit className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit admin account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}

              {judges?.map((judge) => (
                <TableRow key={judge.id}>
                  <TableCell>{judge.id}</TableCell>
                  <TableCell>{judge.name}</TableCell>
                  <TableCell>{judge.email}</TableCell>
                  <TableCell className="font-semibold">JUDGE</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaTrash
                            className="cursor-pointer"
                            onClick={() => handleDeleteJudge(judge.id)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete judge account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaEdit className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit judge account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboardPage;
