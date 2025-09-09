import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Send, Clock, CheckCircle, XCircle } from "lucide-react"

const payouts = [
  {
    id: 1,
    affiliate: "Sarah Johnson",
    amount: 1542.0,
    period: "March 2024",
    method: "PayPal",
    status: "completed",
    date: "2024-04-01",
    transactionId: "TXN-001",
  },
  {
    id: 2,
    affiliate: "Mike Chen",
    amount: 875.0,
    period: "March 2024",
    method: "Bank Transfer",
    status: "processing",
    date: "2024-04-01",
    transactionId: "TXN-002",
  },
]

const pendingPayouts = payouts.filter((p) => p.status === "pending")
const totalPending = pendingPayouts.reduce((sum, p) => sum + p.amount, 0)

export function PayoutsPage() {
  return (
    <>
      <DashboardHeader title="Payouts" description="Manage affiliate commission payments and schedules">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Send className="h-4 w-4 mr-2" />
            Process Payouts
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{pendingPayouts.length} affiliates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,417</div>
            <p className="text-xs text-muted-foreground">Paid out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$875</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Payment success</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Payouts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Complete history of affiliate commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Affiliate</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Period</th>
                      <th className="text-left py-3 px-4 font-medium">Method</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payouts.map((payout) => (
                      <tr key={payout.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{payout.affiliate}</td>
                        <td className="py-3 px-4">${payout.amount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-muted-foreground">{payout.period}</td>
                        <td className="py-3 px-4">{payout.method}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              payout.status === "completed"
                                ? "default"
                                : payout.status === "processing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {payout.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {payout.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                            {payout.status === "pending" && <XCircle className="h-3 w-3 mr-1" />}
                            {payout.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {payout.date ? new Date(payout.date).toLocaleDateString() : "-"}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground font-mono text-sm">
                          {payout.transactionId || "-"}
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
        </TabsContent>
      </Tabs>
    </>
  )
}
