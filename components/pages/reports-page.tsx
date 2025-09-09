import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Calendar, TrendingUp, Users, DollarSign } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyData = [
  { month: "Jan", affiliates: 35, revenue: 28400, commissions: 2840, conversions: 284 },
  { month: "Feb", affiliates: 38, revenue: 32100, commissions: 3210, conversions: 321 },
  { month: "Mar", affiliates: 42, revenue: 36300, commissions: 3630, conversions: 363 },
  { month: "Apr", affiliates: 45, revenue: 41200, commissions: 4120, conversions: 412 },
  { month: "May", affiliates: 48, revenue: 45800, commissions: 4580, conversions: 458 },
  { month: "Jun", affiliates: 52, revenue: 51600, commissions: 5160, conversions: 516 },
]

const topPerformers = [
  { name: "Sarah Johnson", revenue: 15420, commissions: 1542, conversions: 154 },
  { name: "Mike Chen", revenue: 12800, commissions: 1280, conversions: 128 },
  { name: "Alex Rodriguez", revenue: 9650, commissions: 965, conversions: 97 },
  { name: "Lisa Wang", revenue: 8200, commissions: 820, conversions: 82 },
  { name: "David Brown", revenue: 6750, commissions: 675, conversions: 68 },
]

export function ReportsPage() {
  return (
    <>
      <DashboardHeader title="Reports & Analytics" description="Comprehensive insights and performance reports">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="affiliates">Top Affiliates</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$235,400</div>
                <p className="text-xs text-muted-foreground">+18.2% from last period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52</div>
                <p className="text-xs text-muted-foreground">+7 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commissions Paid</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$23,540</div>
                <p className="text-xs text-muted-foreground">10% average rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8%</div>
                <p className="text-xs text-muted-foreground">+0.3% improvement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Revenue and commission trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" />
                  <Bar dataKey="commissions" fill="hsl(var(--chart-2))" name="Commissions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliates">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Affiliates</CardTitle>
              <CardDescription>Highest revenue generating affiliates this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((affiliate, index) => (
                  <div key={affiliate.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{affiliate.name}</p>
                        <p className="text-sm text-muted-foreground">{affiliate.conversions} conversions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${affiliate.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">${affiliate.commissions} commission</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
