import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Copy, ExternalLink, QrCode, BarChart } from "lucide-react"

const affiliateLinks = [
  {
    id: 1,
    name: "Homepage Link",
    url: "https://example.com/?ref=SARAH2024",
    code: "SARAH2024",
    affiliate: "Sarah Johnson",
    clicks: 1250,
    conversions: 42,
    revenue: 4200,
    status: "active",
  },
  {
    id: 2,
    name: "Product Page Link",
    url: "https://example.com/product?ref=MIKE2024",
    code: "MIKE2024",
    affiliate: "Mike Chen",
    clicks: 890,
    conversions: 28,
    revenue: 2800,
    status: "active",
  },
]

const promosCodes = [
  {
    id: 1,
    code: "SAVE20",
    discount: "20%",
    affiliate: "Sarah Johnson",
    uses: 45,
    revenue: 2250,
    expires: "2024-12-31",
    status: "active",
  },
  {
    id: 2,
    code: "NEWUSER15",
    discount: "15%",
    affiliate: "Mike Chen",
    uses: 32,
    revenue: 1600,
    expires: "2024-06-30",
    status: "active",
  },
]

export function LinksPage() {
  return (
    <>
      <DashboardHeader title="Links & Codes" description="Manage affiliate tracking links and promotional codes">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Link
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="links" className="space-y-6">
        <TabsList>
          <TabsTrigger value="links">Tracking Links</TabsTrigger>
          <TabsTrigger value="codes">Promo Codes</TabsTrigger>
          <TabsTrigger value="generator">Link Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Tracking Links</CardTitle>
              <CardDescription>Monitor performance of all affiliate tracking links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Link Name</th>
                      <th className="text-left py-3 px-4 font-medium">Affiliate</th>
                      <th className="text-left py-3 px-4 font-medium">Code</th>
                      <th className="text-left py-3 px-4 font-medium">Clicks</th>
                      <th className="text-left py-3 px-4 font-medium">Conversions</th>
                      <th className="text-left py-3 px-4 font-medium">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliateLinks.map((link) => (
                      <tr key={link.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{link.name}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">{link.url}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{link.affiliate}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{link.code}</Badge>
                        </td>
                        <td className="py-3 px-4">{link.clicks.toLocaleString()}</td>
                        <td className="py-3 px-4">{link.conversions}</td>
                        <td className="py-3 px-4">${link.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge variant={link.status === "active" ? "default" : "secondary"}>{link.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codes">
          <Card>
            <CardHeader>
              <CardTitle>Promotional Codes</CardTitle>
              <CardDescription>Manage discount codes for affiliate promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Code</th>
                      <th className="text-left py-3 px-4 font-medium">Discount</th>
                      <th className="text-left py-3 px-4 font-medium">Affiliate</th>
                      <th className="text-left py-3 px-4 font-medium">Uses</th>
                      <th className="text-left py-3 px-4 font-medium">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium">Expires</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promosCodes.map((code) => (
                      <tr key={code.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="font-mono">
                            {code.code}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-medium">{code.discount}</td>
                        <td className="py-3 px-4">{code.affiliate}</td>
                        <td className="py-3 px-4">{code.uses}</td>
                        <td className="py-3 px-4">${code.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(code.expires).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={code.status === "active" ? "default" : "secondary"}>{code.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Generate Tracking Link</CardTitle>
                <CardDescription>Create a new affiliate tracking link</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="affiliate">Select Affiliate</Label>
                  <Input id="affiliate" placeholder="Choose affiliate..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination URL</Label>
                  <Input id="destination" placeholder="https://example.com/product" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign">Campaign Name</Label>
                  <Input id="campaign" placeholder="Summer Sale 2024" />
                </div>
                <Button className="w-full">Generate Link</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Promo Code</CardTitle>
                <CardDescription>Generate a new promotional discount code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="promo-code">Code</Label>
                  <Input id="promo-code" placeholder="SAVE20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <Input id="discount-type" placeholder="Percentage or Fixed Amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" type="date" />
                </div>
                <Button className="w-full">Create Code</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
