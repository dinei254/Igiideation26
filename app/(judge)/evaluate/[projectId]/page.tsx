"use client";

import { useState } from "react";
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
import { GoogleDriveVideo } from "@/components/video-viewer";
import { GoogleDrivePoster } from "@/components/poster-viewer";
import SupportingDocuments from "@/components/supporting-docs";
import EvalForm from "@/components/eval-form";
import { Project } from "@prisma/client";

const data = {
  project_id: "123456",
  project_name: "Project Name",
  documents: [
    {
      id: 1,
      title: "Terms of Service",
      fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu",
    },
    {
      id: 2,
      title: "Privacy Policy",
      fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu",
    },
    { id: 3, title: "User Guide", fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu" },
    { id: 4, title: "FAQ", fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu" },
  ],
  videoId: "1Q_mBewWcVhYwCZpJWFmzHU3-iZIlJqQU",
  posterId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu",
};

export default function JudgeDashboard({
  params,
}: {
  params: { projectId: string };
}) {
  const [activeTab, setActiveTab] = useState("uploaded-videos");
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const projectId = params.projectId;
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProject = async () => {
    try {
      const res = await fetch(`/api/project`);
    } catch (error: any) {
      console.error(`Failed to get project : ${error.message}`);
    }
  };

  const toggleRightPanel = () => {
    setIsRightOpen(!isRightOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "uploaded-videos":
        return <UploadedVideos />;
      case "abstract":
        return <Abstract />;
      case "supporting-documents-list":
        return <SupportingDocumentsList />;
      case "poster":
        return <Poster />;
      default:
        return null;
    }
  };

  return (
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
                variant={activeTab === "uploaded-videos" ? "default" : "ghost"}
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
            {data.project_name} - {data.project_id}
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
          <EvalForm projectId={data.project_id} />
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
  );
}

function Abstract() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Abstract</h2>
      <GoogleDrivePoster fileId={data.posterId} /> {/* replace with abstract */}
    </div>
  );
}

function UploadedVideos() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Uploaded Videos</h2>
      <GoogleDriveVideo fileId={data.videoId} />
    </div>
  );
}

function SupportingDocumentsList() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Supporting Documents</h1>
      <SupportingDocuments documents={data.documents} />
    </div>
  );
}

function Poster() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Poster</h2>
      <GoogleDrivePoster fileId={data.posterId} />
    </div>
  );
}
