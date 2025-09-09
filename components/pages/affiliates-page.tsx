import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTable } from "@/components/responsive-table"
import { Plus, Search, Filter } from "lucide-react"

const affiliates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    totalSales: 15420,
    commission: 1542,
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    status: "active",
    totalSales: 8750,
    commission: 875,
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    status: "pending",
    totalSales: 0,
    commission: 0,
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    status: "inactive",
    totalSales: 3200,
    commission: 320,
    joinDate: "2024-01-05",
  },
]

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email", className: "text-muted-foreground" },
  {
    key: "status",
    label: "Status",
    render: (status: string) => (
      <Badge variant={status === "active" ? "default" : status === "pending" ? "secondary" : "outline"}>{status}</Badge>
    ),
  },
  { key: "totalSales", label: "Total Sales", render: (value: number) => `$${value.toLocaleString()}` },
  { key: "commission", label: "Commission", render: (value: number) => `$${value.toLocaleString()}` },
  {
    key: "joinDate",
    label: "Join Date",
    className: "text-muted-foreground",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
]

export function AffiliatesPage() {
  return (
    <>
      <DashboardHeader
        title="Affiliates Management"
        description="Manage your affiliate partners and track their performance"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Affiliate
          </Button>
        </div>
      </DashboardHeader>

      <ResponsiveTable
        data={affiliates}
        columns={columns}
        title="All Affiliates"
        mobileCardRender={(affiliate) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{affiliate.name}</p>
                <p className="text-sm text-muted-foreground">{affiliate.email}</p>
              </div>
              <Badge
                variant={
                  affiliate.status === "active" ? "default" : affiliate.status === "pending" ? "secondary" : "outline"
                }
              >
                {affiliate.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Sales</p>
                <p className="font-medium">${affiliate.totalSales.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Commission</p>
                <p className="font-medium">${affiliate.commission.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm text-muted-foreground">
                Joined {new Date(affiliate.joinDate).toLocaleDateString()}
              </span>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        )}
      />
    </>
  )
}
