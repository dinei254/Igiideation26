import React, { FormEvent, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Judge, Project } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ImCross } from "react-icons/im";

const ProjectTableRow = ({
  project,
  judges,
}: {
  project: Project;
  judges: Judge[];
}) => {
  const [selectedJudgesName, setSelectedJudgesName] = useState<Judge[]>([]);
  const [selectedJudges, setSelectedJudges] = useState<Judge[]>([]);

  const handleUpdateProject = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      // formData.append("project", JSON.stringify(updatedProjectForm));
      formData.append("id", id);

      // console.log(updatedProjectForm)

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
      1;
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

  return (
    <TableRow key={project.id}>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.titleOfInnovation}</TableCell>
      <TableCell>{project.status}</TableCell>
      <TableCell>{project.assignedJudges?.length || 0} judge(s)</TableCell>
      <TableCell className="flex items-center gap-x-2">
        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaTrash className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
            </DialogHeader>
            <p>Are you sure to delete this project?</p>
            <p className="text-red-500 font-semibold">
              The process is irreversible.
            </p>
            <div className="mt-5 flex justify-end gap-x-4">
              <Button
                variant={"destructive"}
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
            <form onSubmit={(e) => handleUpdateProject(e, project.id)}>
              <div>
                <Label>Title of innovation</Label>
                <Input
                  id="titleOfInnovation"
                  required
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  defaultValue={project.titleOfInnovation}
                />
              </div>
              <div>
                <Label>Abstract Link</Label>
                <Input
                  id="abstractLink"
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  defaultValue={project.abstractLink}
                />
              </div>
              <div>
                <Label>Poster Link</Label>
                <Input
                  id="posterLink"
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  defaultValue={project.posterLink}
                />
              </div>
              <div>
                <Label>Video Link</Label>
                <Input
                  id="videoLink"
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  defaultValue={project.videoLink}
                />
              </div>
              <div>
                <Label>Supporting documents</Label>
                <Input
                  placeholder="Supporting document 1"
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  id="supportingDocumentLink1"
                  defaultValue={project.supportingDocumentLink1}
                />
                <Input
                  placeholder="Supporting document 2"
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  id="supportingDocumentLink2"
                  defaultValue={project.supportingDocumentLink2}
                />
                <Input
                  placeholder="Supporting document 3"
                  id="supportingDocumentLink3"
                  // onChange={(e) => handleUpdateProjectForm(e)}
                  defaultValue={project.supportingDocumentLink3}
                />
              </div>
              <Button className="w-full mt-5" type="submit">
                Update Project
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
                  <p>Assign Judge</p>
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
                  setSelectedJudges([...selectedJudges!, parsedJudge]);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select judges" />
              </SelectTrigger>
              <SelectContent>
                {judges?.map((judge) => (
                  <SelectItem key={judge.id} value={JSON.stringify(judge)}>
                    {judge.name} (Currently judging :{" "}
                    {judge.projectToBeJudged?.length || 0} project)
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
                      const filteredJudges = selectedJudges.filter(
                        (currentJudge) => currentJudge.id !== judge.id
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
              Assign Judges
            </Button>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default ProjectTableRow;
