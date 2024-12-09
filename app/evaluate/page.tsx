"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Video, FileText, File, Star, PlusCircle } from 'lucide-react'
import { GoogleDriveVideo } from '@/components/video-viewer';
import { GoogleDrivePoster } from '@/components/poster-viewer';
import SupportingDocuments from '@/components/supporting-docs';

const data = {
  documents: [
    { id: 1, title: "Terms of Service", fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu" },
    { id: 2, title: "Privacy Policy", fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu" },
    { id: 3, title: "User Guide", fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu" },
    { id: 4, title: "FAQ", fileId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu" },
  ],
  videoId: "1Q_mBewWcVhYwCZpJWFmzHU3-iZIlJqQU",
  posterId: "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu"
};

export default function JudgeDashboard() {
  const [activeTab, setActiveTab] = useState('uploaded-videos')

  const renderContent = () => {
    switch (activeTab) {
      case 'uploaded-videos':
        return <UploadedVideos />
      case 'abstract':
        return <Abstract />
      case 'supporting-documents-list':
        return <SupportingDocumentsList />
      case 'poster':
        return <Poster />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4 flex flex-col justify-between">
        <ScrollArea className="h-full">
          <div className="space-y-2">
            <Button
              variant={activeTab === 'abstract' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('abstract')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Abstract
            </Button>
            <Button
              variant={activeTab === 'uploaded-videos' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('uploaded-videos')}
            >
              <Video className="mr-2 h-4 w-4" />
              Uploaded Videos
            </Button>
            <Button
              variant={activeTab === 'supporting-documents-list' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('supporting-documents-list')}
            >
              <File className="mr-2 h-4 w-4" />
              Supporting Documents
            </Button>
            <Button
              variant={activeTab === 'poster' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('poster')}
            >
              <Star className="mr-2 h-4 w-4" />
              Posters
            </Button>
          </div>
        </ScrollArea>
        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => alert('New Button Clicked')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Evaluate
          </Button>
        </div>
      </nav>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Judging System</h1>
        {renderContent()}
      </main>
    </div>
  )
}

function Abstract() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Abstract</h2>
      <GoogleDrivePoster fileId={data.posterId} /> {/* replace with abstract */}
    </div>
  )
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
  )
}

function Poster() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Poster</h2>
      <GoogleDrivePoster fileId={data.posterId} />
    </div>
  )
}