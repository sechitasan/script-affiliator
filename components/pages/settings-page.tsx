import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, DollarSign } from "lucide-react"

export function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" description="Configure your affiliate program settings and preferences">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
                <CardDescription>Basic information about your affiliate program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="program-name">Program Name</Label>
                    <Input id="program-name" defaultValue="AffiliateHub Program" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="AffiliateHub Inc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Program Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="Join our affiliate program and earn commissions by promoting our products to your audience."
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" defaultValue="https://example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" defaultValue="support@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Configure how new affiliates can join your program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve applications</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve new affiliate applications</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require tax information</Label>
                    <p className="text-sm text-muted-foreground">Require affiliates to provide tax information</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email verification required</Label>
                    <p className="text-sm text-muted-foreground">Require email verification for new affiliates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="commissions">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission Structure</CardTitle>
                <CardDescription>Configure commission rates and payment terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-rate">Default Commission Rate (%)</Label>
                    <Input id="default-rate" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimum-payout">Minimum Payout Amount ($)</Label>
                    <Input id="minimum-payout" type="number" defaultValue="50" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cookie-duration">Cookie Duration (days)</Label>
                    <Input id="cookie-duration" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payout-schedule">Payout Schedule</Label>
                    <Input id="payout-schedule" defaultValue="Monthly" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Integrations</CardTitle>
                <CardDescription>Configure payment methods for affiliate payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Stripe</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
