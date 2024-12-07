import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TitleForm from "./titleForm"

export function TitleCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // variant="outline"
          className="bg-white text-black hover:text-white px-[2rem]"
        >
          Title
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h2 className="font-semibold text-xl">Create Title</h2>
        <TitleForm></TitleForm>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
