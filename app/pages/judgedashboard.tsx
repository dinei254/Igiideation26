"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Video, FileText, File, Star } from 'lucide-react'

export default function JudgeDashboard() {
  const [activeTab, setActiveTab] = useState('uploaded-videos')

  const renderContent = () => {
    switch (activeTab) {
      case 'uploaded-videos':
        return <UploadedVideos />
      case 'abstract':
        return <Abstract />
      case 'supporting-documents':
        return <SupportingDocuments />
      case 'mark-evaluations':
        return <Posters />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <ScrollArea className="h-full">
          <div className="space-y-2">
            <Button
              variant={activeTab === 'uploaded-videos' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('uploaded-videos')}
            >
              <Video className="mr-2 h-4 w-4" />
              Uploaded Videos
            </Button>
            <Button
              variant={activeTab === 'abstract' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('abstract')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Abstract
            </Button>
            <Button
              variant={activeTab === 'supporting-documents' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('supporting-documents')}
            >
              <File className="mr-2 h-4 w-4" />
              Supporting Documents
            </Button>
            <Button
              variant={activeTab === 'mark-evaluations' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('mark-evaluations')}
            >
              <Star className="mr-2 h-4 w-4" />
              Mark Evaluations
            </Button>
          </div>
        </ScrollArea>
      </nav>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Judging System</h1>
        {renderContent()}
        <div className="mt-4">
          <Link href="/evaluate" className="text-blue-500 hover:underline">
            Go to Evaluation Page
          </Link>
        </div>
      </main>
    </div>
  )
}


function Abstract() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Abstract</h2>
      <p>Abstract content will appear here.</p>
    </div>
  )
}

function UploadedVideos() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Uploaded Videos</h2>
      <p>List of uploaded videos will appear here.</p>
    </div>
  )
}


function SupportingDocuments() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Supporting Documents</h2>
      <p>Supporting documents will be listed here.</p>
    </div>
  )
}

function Posters() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Mark Evaluations</h2>
      <p>Mark evaluation summary will be displayed here.</p>
    </div>
  )
}

