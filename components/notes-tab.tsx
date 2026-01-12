"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Note } from "@/lib/types"

interface NotesTabProps {
  leadId: string
}

export function NotesTab({ leadId }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      leadId,
      content: newNote,
      createdBy: "Current User",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setNotes([note, ...notes])
    setNewNote("")
  }

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditingNote(id)
      setEditContent(note.content)
    }
  }

  const handleSaveEdit = () => {
    if (!editingNote) return

    setNotes(
      notes.map((note) => (note.id === editingNote ? { ...note, content: editContent, updatedAt: new Date() } : note)),
    )
    setEditingNote(null)
    setEditContent("")
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Add Note */}
      <Card className="p-4">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={4}
          className="mb-4"
        />
        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </Card>

      {/* Notes List */}
      {notes.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">No notes yet</div>
        </Card>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id} className="p-4">
              {editingNote === note.id ? (
                <div>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="mb-4"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingNote(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{note.createdBy}</p>
                      <p className="text-xs text-muted-foreground">
                        {note.createdAt.toLocaleString()}
                        {note.createdAt.getTime() !== note.updatedAt.getTime() && " (edited)"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditNote(note.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
