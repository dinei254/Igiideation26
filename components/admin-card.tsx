import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminForm from "./admin-form";

export function AdminCard() {
  return (
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
        <DialogTitle>Create Admin</DialogTitle>
        <AdminForm></AdminForm>
      </DialogContent>
    </Dialog>
  );
}
