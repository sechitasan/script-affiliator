"use client"

import { useState, useEffect } from "react"
import { Filter, Download, Copy, Sparkles, ChevronDown, Plus, Save } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type ProductsPageProps = {
  userId: string
}

type Product = {
  id: string
  name: string
}

const HOOK_OPTIONS = [
  "Are you struggling with [problem]?",
  "Imagine if you could [benefit]...",
  "What if I told you [solution]?",
  "Stop wasting time on [pain point].",
  "Here’s the secret to [result]...",
]

export function ScriptGeneratorPage({ userId }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [productId, setProductId] = useState<string>("")
  const [keyPoints, setKeyPoints] = useState<string>("")
  const [tone, setTone] = useState<string>("Persuasive")
  const [duration, setDuration] = useState<string>("30")
  const [contentType, setContentType] = useState<string>("video_ads")
  const [openingLines, setOpeningLines] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [generatedScript, setGeneratedScript] = useState<string>("")
  const [scriptCount, setScriptCount] = useState<string>("1") // default 1
  const [availableHooks, setAvailableHooks] = useState<string[]>([])
  const [selectedHooks, setSelectedHooks] = useState<string[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [newHook, setNewHook] = useState<string>("")

  // ✅ Ambil produk milik user
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?userId=${userId}`)
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
        toast.error("Error loading products")
      }
    }
    fetchProducts()
  }, [userId])

  const fetchHooks = async () => {
    try {
      const res = await fetch(`/api/hooks?userId=${userId}`)
      if (!res.ok) throw new Error("Failed to fetch hooks")
      const data = await res.json()
      const hooks = data.map((h: any) => h.title)
      setAvailableHooks(hooks)
    } catch (err) {
      console.error(err)
      toast.error("Error loading hooks")  
    }
  }

  useEffect(() => {
    fetchHooks()
  }, [userId])

  const saveHook = async (hook: string) => {
    if (!hook.trim()) return;

    try {
      const res = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: hook.trim(),
          userId: userId || null,
        }),
      })

      if (!res.ok) throw new Error("Failed to save hook")

      const savedHook = await res.json()
      setAvailableHooks((prev) => [...prev, savedHook.title]);
      toast.success("Hook saved successfully!")
      setNewHook("")
      fetchHooks()
      setDropdownOpen(true)
    } catch (err) {
      console.error(err)
      toast.error("Failed to save hook");
    }
  }

  const handleGenerate = async () => {
    if (!productId || !keyPoints) {
      toast.error("Please select a product and add key points")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          keyPoints,
          tone,
          duration,
          contentType,
          openingLines,
          scriptCount, 
          userId,
        }),
      })

      if (!res.ok) throw new Error("Failed to generate script")

      const data = await res.json()
      setGeneratedScript(data.script)
      toast.success("Script generated!")
    } catch (err) {
      console.error(err)
      toast.error("Error generating script")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!generatedScript) return
    navigator.clipboard.writeText(generatedScript)
    toast.success("Copied to clipboard")
  }

  const handleSelect = (hook: string) => {
    setSelectedHooks([...selectedHooks, hook]);
    setAvailableHooks(availableHooks.filter((h) => h !== hook));
  }

  const handleRemove = (hook: string) => {
    setSelectedHooks(selectedHooks.filter((h) => h !== hook));
    setAvailableHooks([...availableHooks, hook]);
  }


  return (
    <>
      <DashboardHeader
        title="Script Generator"
        description="Generate marketing or sales scripts for your products"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Generate Script</CardTitle>
          <CardDescription>
            Fill in product details and generate persuasive scripts instantly
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
        {/* Product & Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Product</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger className="bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md">
                {products.length > 0 ? (
                  products.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="hover:bg-blue-50 focus:bg-green-700">
                      {p.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-product" className="text-gray-400">
                    No products available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Key Points</Label>
            <Textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="Enter product key selling points"
              className="bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Opening Lines</Label>
          <div className="relative">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedHooks.length > 0
                ? `${selectedHooks.length} selected`
                : "Select opening lines"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>

            {dropdownOpen && availableHooks.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 shadow-md rounded-md max-h-60 overflow-auto">
                {availableHooks.map((hook) => (
                  <div
                    key={hook}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      if (selectedHooks.length >= 3) return;
                      handleSelect(hook);
                    }}
                  >
                    {hook}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input & Button Add Hook */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add your own hook"
              value={newHook}
              onChange={(e) => setNewHook(e.target.value)}
              className="flex-1 bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700"
            />

            {/* Add button with Plus icon */}
            <Button
              onClick={() => {
                if (!newHook.trim()) return;
                if (selectedHooks.length >= 3) {
                  toast.error("You can select up to 3 opening lines only");
                  return;
                }
                handleSelect(newHook.trim());
                setNewHook("");
              }}
              variant="outline"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* Save button with FloppyDisk icon */}
            <Button
              onClick={() => saveHook(newHook)}
              disabled={!newHook.trim()}
              className="p-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>

          {/* Selected items */}
          {selectedHooks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedHooks.map((hook) => (
                <div
                  key={hook}
                  className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                >
                  {hook}
                  <button
                    className="ml-2 text-green-700 font-bold"
                    onClick={() => handleRemove(hook)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tone, Duration & Jumlah Script */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md">
                <SelectItem value="Persuasive">Persuasive</SelectItem>
                <SelectItem value="Informative">Informative</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 detik</SelectItem>
                <SelectItem value="30">30 detik</SelectItem>
                <SelectItem value="45">45 detik</SelectItem>
                <SelectItem value="60">60 detik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Script Count</Label>
            <Select value={scriptCount} onValueChange={setScriptCount}>
              <SelectTrigger className="bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                <SelectValue placeholder="Select number of scripts" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md">
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Type */}
        <div className="space-y-2">
          <Label>Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="bg-white border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video_ads">Video Ads</SelectItem>
              <SelectItem value="social_post">Social Media Post</SelectItem>
              <SelectItem value="sales_call">Sales Call</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button Generate */}
        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" /> Generate Script
            </>
          )}
        </Button>

        {/* Generated Script */}
        {generatedScript && (
          <div className="mt-3 space-y-2">
            <Label>Generated Script</Label>
            <Textarea value={generatedScript} readOnly className="min-h-[200px]" />
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
          </div>
        )}
      </CardContent>
      </Card>
    </>
  )
}
