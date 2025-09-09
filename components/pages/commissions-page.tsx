import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Filter } from "lucide-react"

const commissions = [
  {
    id: 1,
    affiliate: "Sarah Johnson",
    order: "#ORD-001",
    amount: 154.2,
    rate: "10%",
    status: "paid",
    date: "2024-03-15",
  },
  {
    id: 2,
    affiliate: "Mike Chen",
    order: "#ORD-002",
    amount: 87.5,
    rate: "10%",
    status: "pending",
    date: "2024-03-14",
  },
  {
    id: 3,
    affiliate: "Sarah Johnson",
    order: "#ORD-003",
    amount: 203.4,
    rate: "10%",
    status: "paid",
    date: "2024-03-13",
  },
  {
    id: 4,
    affiliate: "David Brown",
    order: "#ORD-004",
    amount: 45.8,
    rate: "10%",
    status: "processing",
    date: "2024-03-12",
  },
]

export function CommissionsPage() {
  return (
    <>
      <DashboardHeader title="Commissions" description="Track and manage affiliate commission payments">
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,630</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$491.90</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <CardDescription>Recent commission transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Affiliate</th>
                  <th className="text-left py-3 px-4 font-medium">Order</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Rate</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((commission) => (
                  <tr key={commission.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{commission.affiliate}</td>
                    <td className="py-3 px-4 text-muted-foreground">{commission.order}</td>
                    <td className="py-3 px-4">${commission.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{commission.rate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          commission.status === "paid"
                            ? "default"
                            : commission.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {commission.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(commission.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
