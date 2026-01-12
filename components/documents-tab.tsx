"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, File, FileText, ImageIcon, Download, Trash2, Search } from "lucide-react"
import type { Document } from "@/lib/types"

interface DocumentsTabProps {
  leadId: string
}

export function DocumentsTab({ leadId }: DocumentsTabProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newDocuments = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      leadId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedBy: "Current User",
      uploadedAt: new Date(),
    }))

    setDocuments([...newDocuments, ...documents])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (type.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className={`p-8 border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
          <Input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose Files
            </label>
          </Button>
        </div>
      </Card>

      {/* Search */}
      {documents.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {/* Documents List */}
      {filteredDocuments.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            {documents.length === 0 ? "No documents uploaded yet" : "No documents found"}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">{getFileIcon(doc.type)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{doc.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(doc.size)} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={doc.url} download={doc.name}>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
