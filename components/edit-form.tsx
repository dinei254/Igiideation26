import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "./title-table"; // Make sure to import the Title type

interface EditFormProps {
  title: Title;
  onSubmit: (updatedTitle: Title) => void;
}

export default function EditForm({ title, onSubmit }: EditFormProps) {
   const [updatedTitle, setUpdatedTitle] = useState(title.title);
   const [updatedVideo, setUpdatedVideo] = useState(title.video);
   const [updatedSupport, setUpdatedSupport] = useState(title.support);
   const [updatedPoster, setUpdatedPoster] = useState(title.poster);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...title, title: updatedTitle, video: updatedVideo, support: updatedSupport, poster: updatedPoster });
  };

   return (
     <form className="space-y-4">
       <div>
         <label>Title</label>
         <Input
           value={updatedTitle}
           onChange={(e) => setUpdatedTitle(e.target.value)}
         />
       </div>
       <div>
         <label>Video</label>
         <Input
           value={updatedVideo}
           onChange={(e) => setUpdatedVideo(e.target.value)}
         />
       </div>
       <div>
         <label>Support</label>
         <Input
           value={updatedSupport}
           onChange={(e) => setUpdatedSupport(e.target.value)}
         />
       </div>
       <div>
         <label>Poster</label>
         <Input
           value={updatedPoster}
           onChange={(e) => setUpdatedPoster(e.target.value)}
         />
       </div>
       <div className="flex justify-end">
         <Button type="button" onClick={handleSubmit}>
           Save
         </Button>
       </div>
     </form>
   );
}
