"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"
import type { LeadForm } from "@/lib/types"

interface EmbedCodeDialogProps {
  form: LeadForm
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmbedCodeDialog({ form, open, onOpenChange }: EmbedCodeDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(form.embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Embed Code: {form.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Copy and paste this code into your website to embed the form. The form will automatically capture leads
              and add them to your CRM.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Embed Code</Label>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <Textarea value={form.embedCode} readOnly rows={4} className="font-mono text-sm" />
          </div>

          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Instructions</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copy the embed code above</li>
              <li>Paste it into your website's HTML where you want the form to appear</li>
              <li>The form will automatically sync with your CRM</li>
              <li>New submissions will appear in your Leads section</li>
            </ol>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
              <span>💡</span>
              Pro Tip
            </h4>
            <p className="text-sm">
              You can customize the form's appearance using CSS or integrate it with your existing design system. The
              form is fully responsive and works on all devices.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
