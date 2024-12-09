import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditForm from "./edit-form";
import { Title } from "./title-table"; // Make sure to import the Title type

interface EditCardProps {
  title: Title;
  onEdit: (updatedTitle: Title) => void;
}

export function EditCard({ title, onEdit }: EditCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:text-white">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edit Title</DialogTitle>
        <EditForm title={title} onSubmit={onEdit} />
      </DialogContent>
    </Dialog>
  );
}
