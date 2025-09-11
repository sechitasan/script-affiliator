"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, ArrowLeft } from "lucide-react"
import { ScriptDetail } from "./script-detail-page"

export function ScriptGalleryPage() {
  const [scripts, setScripts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedScript, setSelectedScript] = useState<any | null>(null)

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const res = await fetch("/api/scripts")
        if (!res.ok) throw new Error("Failed to fetch scripts")
        const data = await res.json()
        setScripts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchScripts()
  }, [])

  if (selectedScript) {
    return (
     <ScriptDetail
          script={selectedScript}
          productId={selectedScript.products?.id ?? null}
          onBack={() => setSelectedScript(null)}
        />
    )
  }

  return (
    <>
      <DashboardHeader
        title="Script Gallery"
        description="A collection of ad scripts you’ve generated"
      />

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Script List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Product</TableHead>
                    <TableHead>Latest Script</TableHead>
                    <TableHead className="w-[160px]">Created At</TableHead>
                    <TableHead className="w-[120px]">Script Count</TableHead>
                    <TableHead className="w-[80px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scripts.map((script) => (
                    <TableRow key={script.id}>
                      <TableCell className="font-medium">
                        {script.products?.name ?? "-"}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {script.content}
                      </TableCell>
                      <TableCell>
                        {new Date(script.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {script.script_count ?? 0}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                          onClick={() => setSelectedScript(script)}
                        >
                          <Eye className="h-5 w-5" strokeWidth={2} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
