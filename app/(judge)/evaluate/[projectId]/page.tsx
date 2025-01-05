"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Video,
  FileText,
  File,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { VideoViewer } from "@/app/(judge)/evaluate/[projectId]/VideoViewer";
import { PosterViewer } from "@/app/(judge)/evaluate/[projectId]/PosterViewer";
import { AbstractViewer } from "./AbstractViewer";
import EvalForm from "@/components/eval-form";
import { Project } from "@prisma/client";
import JudgeHeader from "@/components/judge-header";

export default function JudgeDashboard({
  params,
}: {
  params: { projectId: string };
}) {
  const [activeTab, setActiveTab] = useState("abstract");
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const projectId = params.projectId;
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProject = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/project?projectId=${projectId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    } catch (error: any) {
      console.error(`Failed to get project : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRightPanel = () => {
    setIsRightOpen(!isRightOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "uploaded-videos":
        return <VideoViewer videoLink={project?.videoLink!} />;
      case "abstract":
        return <AbstractViewer abstractLink={project?.abstractLink!} />;
      // case "supporting-documents-list":
      //   return <SupportingDocumentsList />;
      case "poster":
        return <PosterViewer posterLink={project?.posterLink!} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  return (
    <div>
      <JudgeHeader />
      <div className="flex h-screen">
        {/* Left Panel */}
        <div
          className={`bg-muted transition-all duration-300 ease-in-out ${
            isRightOpen ? "w-1/2" : "w-full"
          } p-4`}
        >
          <nav className="bg-gray-100 p-4 flex justify-between">
            <ScrollArea className="w-full">
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === "abstract" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("abstract")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Abstract
                </Button>
                <Button
                  variant={
                    activeTab === "uploaded-videos" ? "default" : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setActiveTab("uploaded-videos")}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Uploaded Videos
                </Button>
                <Button
                  variant={
                    activeTab === "supporting-documents-list"
                      ? "default"
                      : "ghost"
                  }
                  className="justify-start"
                  onClick={() => setActiveTab("supporting-documents-list")}
                >
                  <File className="mr-2 h-4 w-4" />
                  Supporting Documents
                </Button>
                <Button
                  variant={activeTab === "poster" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("poster")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Posters
                </Button>
              </div>
            </ScrollArea>
          </nav>
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-4">
              Title :{" "}
              <span className="fontsemibold">{project?.titleOfInnovation}</span>
            </h1>
            {renderContent()}
          </main>
        </div>
        {/* Right Panel */}
        <div
          className={`bg-background fixed top-0 right-0 h-full transition-all duration-300 ease-in-out ${
            isRightOpen ? "w-1/2" : "w-0"
          } overflow-hidden`}
        >
          <div className="p-4">
            <EvalForm projectId={project?.id!} />
          </div>
        </div>
        {/* Toggle Button */}
        <Button
          onClick={toggleRightPanel}
          className="fixed top-4 right-4 z-10"
          variant="outline"
          size="icon"
        >
          {isRightOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

// function Abstract({ abstractLink }: { abstractLink: string }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Abstract</h2>
//       <GoogleDrivePoster posterLink={abstractLink} />{" "}
//       {/* replace with abstract */}
//     </div>
//   );
// }

// function UploadedVideos({ videoLink }: { videoLink: string }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Uploaded Videos</h2>
//       <GoogleDriveVideo videoLink={videoLink} />
//     </div>
//   );
// }

// function SupportingDocumentsList({
//   supportingDocumentLinks,
// }: {
//   supportingDocumentLinks: string;
// }) {
//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Supporting Documents</h1>
//       <SupportingDocuments documents={data.documents} />
//     </div>
//   );
// }

// function Poster({ posterLink }: { posterLink: string }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Poster</h2>
//       <GoogleDrivePoster posterLink={posterLink} />
//     </div>
//   );
// }
