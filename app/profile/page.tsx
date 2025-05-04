import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-playfair mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="glass-card lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=100&width=100" alt="User" />
                <AvatarFallback className="bg-pink-400/20 text-pink-400 text-xl">U</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-medium">User Name</h2>
              <p className="text-gray-400">user@example.com</p>
              <Button variant="outline" className="mt-4 border-pink-400 text-pink-400 hover:bg-pink-400/10">
                Change Avatar
              </Button>
            </div>

            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-pink-400">
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-pink-400">
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-pink-400">
                Privacy & Security
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-pink-400">
                Payment Methods
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-pink-400">
                Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="bg-gray-800/70 backdrop-blur-sm border-gray-700/50 p-1 mb-6">
              <TabsTrigger value="account" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-pink-400 data-[state=active]:text-black"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-0 space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="User" className="bg-gray-800/50 border-gray-700/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Name" className="bg-gray-800/50 border-gray-700/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="user@example.com"
                      className="bg-gray-800/50 border-gray-700/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="bg-gray-800/50 border-gray-700/50"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-gray-800/50 border-gray-700/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="bg-gray-800/50 border-gray-700/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="bg-gray-800/50 border-gray-700/50" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black">Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-gray-800/50 border-gray-700/50">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-8">
                      <SelectTrigger className="bg-gray-800/50 border-gray-700/50">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-readings" className="font-medium">
                          Reading Reminders
                        </Label>
                        <p className="text-sm text-gray-400">Receive reminders about upcoming readings</p>
                      </div>
                      <Switch id="email-readings" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-promotions" className="font-medium">
                          Promotions
                        </Label>
                        <p className="text-sm text-gray-400">Receive emails about special offers and discounts</p>
                      </div>
                      <Switch id="email-promotions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-newsletter" className="font-medium">
                          Newsletter
                        </Label>
                        <p className="text-sm text-gray-400">Receive our monthly newsletter</p>
                      </div>
                      <Switch id="email-newsletter" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-messages" className="font-medium">
                          New Messages
                        </Label>
                        <p className="text-sm text-gray-400">Receive notifications for new messages</p>
                      </div>
                      <Switch id="push-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-live" className="font-medium">
                          Live Streams
                        </Label>
                        <p className="text-sm text-gray-400">Receive notifications when readers go live</p>
                      </div>
                      <Switch id="push-live" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-updates" className="font-medium">
                          App Updates
                        </Label>
                        <p className="text-sm text-gray-400">Receive notifications about app updates</p>
                      </div>
                      <Switch id="push-updates" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black">Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Visibility</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-online" className="font-medium">
                          Online Status
                        </Label>
                        <p className="text-sm text-gray-400">Show when you're online to others</p>
                      </div>
                      <Switch id="show-online" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-activity" className="font-medium">
                          Activity Status
                        </Label>
                        <p className="text-sm text-gray-400">Show your recent activity to others</p>
                      </div>
                      <Switch id="show-activity" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Usage</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="personalization" className="font-medium">
                          Personalization
                        </Label>
                        <p className="text-sm text-gray-400">
                          Allow us to personalize your experience based on your activity
                        </p>
                      </div>
                      <Switch id="personalization" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics" className="font-medium">
                          Analytics
                        </Label>
                        <p className="text-sm text-gray-400">
                          Allow us to collect anonymous usage data to improve our services
                        </p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-black">Save Privacy Settings</Button>
                </CardFooter>
              </Card>

              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-gray-700/50 text-gray-300 hover:bg-gray-800/50">
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700/50 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  )
}
