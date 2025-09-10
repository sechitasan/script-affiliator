"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { ResponsiveTable } from "@/components/responsive-table"
import { Plus, Search, Filter, X, Eye, Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"

interface ProductsPageProps {
  userId: string
}

interface Product {
  id: string
  name: string
  description?: string | null
  price: string | null
  affiliate_fee: string | null
  created_at: string
  user_id: string | null
  category_id: string | null
  category_name?: string | null
}

interface Category {
  id: string
  name: string
}

export function ProductsPage({ userId }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [viewData, setViewData] = useState<Product | null>(null)
  const [newProducts, setNewProducts] = useState<
    { name: string; description: string; price: string; affiliate_fee: string; category_id: string | null }[]
  >([{ name: "", description: "", price: "", affiliate_fee: "", category_id: null }])
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: "0",
    affiliate_fee: "0",
    created_at: "",
    user_id: userId,
    category_id: null,
  })

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory ? p.category_id === selectedCategory : true;
    return matchSearch && matchCategory;
  })

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "name", label: "Product Name" },
    { key: "category_name", label: "Category", className: "text-muted-foreground" },
    { key: "price", label: "Price", render: (value: string) => `$${Number(value).toLocaleString()}` },
    { key: "affiliate_fee", label: "Affiliate Fee", render: (value: string) => `$${Number(value).toLocaleString()}` },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, product: Product) => (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-blue-100"
                  onClick={() => {
                      setViewData(product)
                      setOpenView(true)
                    }}
                  >
                  <Eye className="w-4 h-4 text-blue-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-yellow-100"
                  onClick={() => {
                    setFormData(product)   
                    setOpenEdit(true)
                  }}
                >
                  <Edit className="w-4 h-4 text-yellow-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-red-100"
                  onClick={() => alert(`Delete ${product.name}`)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage])


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products?userId=${userId}`)
        const data = await res.json()
        setProducts(data || [])
      } catch (err) {
        console.error("Error fetching products:", err)
      }
      setLoading(false)
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/categories`)
        const data = await res.json()
        setCategories(data || [])
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [userId])

  const handleAddProductField = () => {
    if (newProducts.length >= 5) {
      toast.error("Maximum 5 products can be added at once")
      return
    }
    setNewProducts([...newProducts, { name: "", description: "", price: "", affiliate_fee: "", category_id: null }])
  }

  const handleRemoveProductField = (index: number) => {
    setNewProducts(newProducts.filter((_, i) => i !== index))
  }

  const handleChangeProductField = (index: number, field: string, value: string) => {
    const updated = [...newProducts]
    // @ts-ignore
    updated[index][field] = value
    setNewProducts(updated)
  }

  const handleSaveEdit = async () => {
    if (!formData.name || !formData.category_id || !formData.description) {
      toast.error("Name, category, and description are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: formData.id, // wajib dikirim
          price: Number(formData.price) || 0,
          affiliate_fee: Number(formData.affiliate_fee) || 0,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error?.error || "Failed to update product");
        return;
      }

      toast.success("Product updated successfully");
      setOpenEdit(false);

      // Refresh table
      const fetchRes = await fetch(`/api/products?userId=${userId}`);
      const updatedProducts = await fetchRes.json();
      setProducts(updatedProducts || []);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handleSaveProducts = async () => {
    setSaving(true)
    const names = newProducts.map((p) => p.name.trim().toLowerCase());
    const hasDuplicate = names.some((name, idx) => names.indexOf(name) !== idx);
    if (hasDuplicate) {
      toast.error("Product names must be unique")
      setSaving(false)
      return
    }

    // Cek field wajib
    for (const p of newProducts) {
      if (!p.description || !p.category_id) {
        toast.error("Description and Category are required for all products")
        setSaving(false)
        return
      }
    }

    const existingNames = products.map((p) => p.name.trim().toLowerCase());
    const hasExisting = names.some((name) => existingNames.includes(name));
    if (hasExisting) {
      toast.error("Some product names already exist")
      setSaving(false)
      return
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, products: newProducts }),
      });

      if (res.ok) {
        toast.success("Products added successfully");
        setOpenDialog(false);
        setNewProducts([{ name: "", description: "", price: "", affiliate_fee: "", category_id: null }]);

        // Refresh table dengan fetch terbaru
        const fetchRes = await fetch(`/api/products?userId=${userId}`);
        const updatedProducts = await fetchRes.json();
        setProducts(updatedProducts || []);
      } else {
        toast.error("Failed to save products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving products");
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <DashboardHeader title="Products" description="Manage your products and track details">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
         <div className="flex items-center gap-2">
          {/* Filter by Category */}
          <Select
            value={selectedCategory ?? "all"}
            onValueChange={(val) => setSelectedCategory(val === "all" ? null : val)}
          >
            <SelectTrigger className="w-[140px] sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Product */}
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl w-full max-h-[70vh] sm:max-h-[70vh] md:max-h-full overflow-y-auto md:overflow-y-visible">
              <DialogHeader>
                <DialogTitle>Add New Products</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {newProducts.map((p, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end relative p-4 border rounded-lg shadow-sm"
                  >
                    <div className="sm:col-span-2">
                      <Label>Product Name</Label>
                      <Input
                        value={p.name}
                        onChange={(e) => handleChangeProductField(index, "name", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <Label>Description</Label>
                      <Input
                        value={p.description}
                        onChange={(e) => handleChangeProductField(index, "description", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={p.price}
                        onChange={(e) => handleChangeProductField(index, "price", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label>Affiliate Fee</Label>
                      <Input
                        type="number"
                        value={p.affiliate_fee}
                        onChange={(e) => handleChangeProductField(index, "affiliate_fee", e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label>Category</Label>
                      <Select
                        value={p.category_id || ""}
                        onValueChange={(val) => handleChangeProductField(index, "category_id", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {newProducts.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveProductField(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <DialogFooter className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <Button
                variant="outline"
                onClick={handleAddProductField}
                disabled={newProducts.length >= 5 || saving}
                className="w-full sm:w-auto"
              >
                Add Another Product
              </Button>
              <Button className="w-full sm:w-auto" onClick={handleSaveProducts} disabled={saving}>
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Products"
                )}
              </Button>
            </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardHeader>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t pt-4 w-full">
        {/* Rows per page selector (hidden di mobile) */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Rows per page:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1) // reset ke halaman 1
            }}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Showing info */}
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          Showing{" "}
          {filteredProducts.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} entries
        </div>

        {/* Pagination buttons */}
       <div className="flex items-center gap-1">
        {/* Mobile: hanya Previous & Next (ikon) */}
        <div className="flex sm:hidden items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Desktop: full pagination dengan ikon */}
        <div className="hidden sm:flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              className="w-9"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      </div>
      
      <ResponsiveTable
      data={paginatedProducts}
      columns={columns}
      title="All Products"
      mobileCardRender={(product) => (
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <p className="font-medium">{product.name}</p>
            {product.category_name && (
              <p className="text-sm text-muted-foreground">
                Category: {product.category_name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Price</p>
              <p className="font-medium">${Number(product.price).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Affiliate Fee</p>
              <p className="font-medium">${Number(product.affiliate_fee).toLocaleString()}</p>
            </div>
          </div>

          {/* ✅ Actions di mobile */}
          <div className="flex gap-2 justify-end pt-2 border-t">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-blue-100"
              onClick={() => {
                setViewData(product)
                setOpenView(true)
              }}
            >
              <Eye className="w-4 h-4 text-blue-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-yellow-100"
              onClick={() => {
                setFormData(product)
                setOpenEdit(true)
              }}
            >
              <Edit className="w-4 h-4 text-yellow-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-red-100"
              onClick={() => alert(`Delete ${product.name}`)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      )}
    />

    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={formData.name}
                    disabled
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description ?? ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={formData.price ?? ""}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Affiliate Fee</Label>
                    <Input
                      type="number"
                      value={formData.affiliate_fee ?? ""}
                      onChange={(e) => setFormData({ ...formData, affiliate_fee: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Category</Label>
                  <Select
                    value={formData.category_id ?? ""}
                    onValueChange={(val) => setFormData({ ...formData, category_id: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenEdit(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={openView} onOpenChange={setOpenView}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>View Product</DialogTitle>
              </DialogHeader>
              {viewData && (
                <div className="space-y-4">
                  <div>
                    <Label>Product Name</Label>
                    <Input value={viewData.name} readOnly />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={viewData.description ?? ""} readOnly />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Price</Label>
                      <Input value={viewData.price ?? ""} readOnly />
                    </div>
                    <div>
                      <Label>Affiliate Fee</Label>
                      <Input value={viewData.affiliate_fee ?? ""} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={viewData.category_name ?? ""} readOnly />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenView(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    </>
  )
}
