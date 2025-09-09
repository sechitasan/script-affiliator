"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  className?: string
  render?: (value: any, row: any) => React.ReactNode
}

interface ResponsiveTableProps {
  data: any[]
  columns: Column[]
  title?: string
  mobileCardRender?: (item: any, index: number) => React.ReactNode
}

export function ResponsiveTable({ data, columns, title, mobileCardRender }: ResponsiveTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          {title && (
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
          )}
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.map((column) => (
                      <th key={column.key} className={cn("text-left py-3 px-4 font-medium", column.className)}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      {columns.map((column) => (
                        <td key={column.key} className={cn("py-3 px-4", column.className)}>
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {data.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              {mobileCardRender ? (
                mobileCardRender(item, index)
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto"
                    onClick={() => toggleRow(index)}
                  >
                    <span className="font-medium">{item[columns[0]?.key] || `Item ${index + 1}`}</span>
                    {expandedRows.has(index) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {expandedRows.has(index) && (
                    <div className="space-y-2 pt-2 border-t">
                      {columns.slice(1).map((column) => (
                        <div key={column.key} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{column.label}:</span>
                          <span className="text-sm font-medium">
                            {column.render ? column.render(item[column.key], item) : item[column.key]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
