import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import JudgeForm from "./judgeForm";

export function JudgeCard() {
  return (
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
        <DialogTitle>Create Judge</DialogTitle>
        <JudgeForm></JudgeForm>
      </DialogContent>
    </Dialog>
  );
}
