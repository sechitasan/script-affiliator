"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { toast } from "sonner"

export function ScriptDetail({
    script,
    productId,
    onBack,
    }: {
    script: any
    productId: string | number | null
    onBack: () => void
    }) {
    const [relatedScripts, setRelatedScripts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [editedScripts, setEditedScripts] = useState<{ [key: string]: string }>({})
    const [publishStatus, setPublishStatus] = useState<{ [key: string]: boolean }>({})
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (!productId) return

        const fetchScriptsByProduct = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/product-script?productId=${productId}`)
            if (!res.ok) throw new Error("Failed to fetch scripts")
            const data = await res.json()
            setRelatedScripts(data)

            // Set initial edited state and publish status
            const initialEdit: { [key: string]: string } = {}
            const initialPublish: { [key: string]: boolean } = {}
            data.forEach((s: any) => {
            initialEdit[s.id] = s.content
            initialPublish[s.id] = s.is_publish
            })
            setEditedScripts(initialEdit)
            setPublishStatus(initialPublish)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        }

        fetchScriptsByProduct()
    }, [productId])

    const handleSave = async (id: string) => {
        setIsSaving(true)
        try {
            const res = await fetch("/api/scripts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                content: editedScripts[id],
                is_publish: publishStatus[id],
            }),
            })
            if (!res.ok) throw new Error("Failed to save script")
            toast.success("Script edit successfully")
        setIsSaving(false)
        } catch (err) {
            console.error(err)
            alert("Error saving script")
        }
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Script copy to clipboard")
    }

    const handleChange = (id: string, value: string) => {
        setEditedScripts((prev) => ({ ...prev, [id]: value }))
    }

    const handlePublishToggle = async (id: string) => {
        console.log("oke")
        const newStatus = !publishStatus[id]
        setPublishStatus((prev) => ({ ...prev, [id]: newStatus }))

        try {
            const res = await fetch(`/api/is-publish`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_publish: newStatus }),
            })
            if (!res.ok) throw new Error("Failed to update publish status")
            toast.success("Script published succesfully")
        } catch (err) {
            console.error(err)
            alert("Error updating publish status")
            setPublishStatus((prev) => ({ ...prev, [id]: !newStatus }))
        }
    }

  return (
    <>
      <DashboardHeader
        title="Script Detail"
        description={`Detailed view of ${script.products?.name ?? "product"} scripts`}
      />

      {/* Main Script */}
      <Card className="animate-fade-in mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Product Name : {script.products?.name ?? "Untitled Product"}{" "}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </CardHeader>
      </Card>

      {/* All Related Scripts */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading scripts...</p>
        ) : relatedScripts.length === 0 ? (
          <p>No other scripts found.</p>
        ) : (
          relatedScripts.map((s) => (
            <Card key={s.id} className="animate-fade-in">
              <CardHeader>
                <CardTitle>
                  Script Created At: {new Date(s.created_at).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <textarea
                    className="w-full border rounded p-2 text-sm h-32 resize-y"
                    value={editedScripts[s.id]}
                    onChange={(e) => handleChange(s.id, e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={publishStatus[s.id]}
                        onChange={() => handlePublishToggle(s.id)}
                        />
                        Published
                    </label>
                    <div className="flex gap-2">
                        <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(editedScripts[s.id])}
                        className="flex items-center gap-2"
                        >
                        <Copy className="h-4 w-4" />
                        Copy
                        </Button>
                        <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleSave(s.id)}
                        disabled={isSaving} // disable saat loading
                        >
                        {isSaving ? "Saving..." : "Edit"}
                        </Button>
                    </div>
                    </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
