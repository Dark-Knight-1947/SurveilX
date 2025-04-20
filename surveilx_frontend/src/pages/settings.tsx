
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Globe, Key, Languages, Link, LogOut, Monitor, Moon, Save, Shield, Sun, UserCircle } from "lucide-react";
import ThemeToggle from '@/components/ui/ThemeToggle';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <AppLayout title="Settings" subtitle="Configure system preferences and user settings">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general">
          <div className="flex overflow-x-auto mb-6">
            <TabsList className="neumorph-inset">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general">
            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure how SurveilX appears on your devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="theme">Theme</Label>
                    <div className="text-sm text-muted-foreground">
                      Choose between light and dark themes
                    </div>
                  </div>
                  <ThemeToggle/>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="language">Language</Label>
                    <div className="text-sm text-muted-foreground">
                      Select your preferred language
                    </div>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px] bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="stream-quality">Video Stream Quality</Label>
                    <div className="text-sm text-muted-foreground">
                      Higher quality uses more bandwidth
                    </div>
                  </div>
                  <Select defaultValue="high">
                    <SelectTrigger className="w-[180px] bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectItem value="low">Low (480p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="auto">Auto (Adaptive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            

            <div className="flex justify-end">
              <Button className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>Alert Notifications</CardTitle>
                <CardDescription>Configure what events should trigger notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Security Breach Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Critical security incidents
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="breach-email">Email</Label>
                      <Switch id="breach-email" defaultChecked />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="breach-push">Push</Label>
                      <Switch id="breach-push" defaultChecked />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="breach-sms">SMS</Label>
                      <Switch id="breach-sms" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Facial Recognition Matches</Label>
                    <div className="text-sm text-muted-foreground">
                      When faces are identified or flagged
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="facial-email">Email</Label>
                      <Switch id="facial-email" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="facial-push">Push</Label>
                      <Switch id="facial-push" defaultChecked />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="facial-sms">SMS</Label>
                      <Switch id="facial-sms" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Crowd Density Warnings</Label>
                    <div className="text-sm text-muted-foreground">
                      Unusual gathering or overcrowding
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="crowd-email">Email</Label>
                      <Switch id="crowd-email" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="crowd-push">Push</Label>
                      <Switch id="crowd-push" defaultChecked />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="crowd-sms">SMS</Label>
                      <Switch id="crowd-sms" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>System Updates</Label>
                    <div className="text-sm text-muted-foreground">
                      Software updates and maintenance
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="system-email">Email</Label>
                      <Switch id="system-email" defaultChecked />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="system-push">Push</Label>
                      <Switch id="system-push" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="system-sms">SMS</Label>
                      <Switch id="system-sms" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update your notification contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email-alerts">Email for Alerts</Label>
                  <Input 
                    id="email-alerts" 
                    type="email" 
                    defaultValue="john.smith@company.com" 
                    className="bg-surveil-dark-300 border-surveil-dark-200" 
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="phone-alerts">Phone Number for SMS/Calls</Label>
                  <Input 
                    id="phone-alerts" 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567" 
                    className="bg-surveil-dark-300 border-surveil-dark-200" 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage how your data is used and stored</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="activity-log">Activity Logging</Label>
                    <div className="text-sm text-muted-foreground">
                      Log all user actions for audit purposes
                    </div>
                  </div>
                  <Switch id="activity-log" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="usage-analytics">Usage Analytics</Label>
                    <div className="text-sm text-muted-foreground">
                      Share anonymous usage data to improve the system
                    </div>
                  </div>
                  <Switch id="usage-analytics" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="data-retention">Data Retention Period</Label>
                    <div className="text-sm text-muted-foreground">
                      How long to keep surveillance footage
                    </div>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-[180px] bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">365 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>Security Options</CardTitle>
                <CardDescription>Configure system security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-logout">Auto Logout</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically log out after period of inactivity
                    </div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px] bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="login-attempts">Failed Login Attempts</Label>
                    <div className="text-sm text-muted-foreground">
                      Number of attempts before account lockout
                    </div>
                  </div>
                  <Select defaultValue="5">
                    <SelectTrigger className="w-[180px] bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectValue placeholder="Select attempts" />
                    </SelectTrigger>
                    <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="ip-restrict">IP Restriction</Label>
                    <div className="text-sm text-muted-foreground">
                      Limit access to specific IP addresses
                    </div>
                  </div>
                  <Switch id="ip-restrict" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Update Security Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>Camera Systems</CardTitle>
                <CardDescription>Connect to external camera networks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Axis IP Cameras</Label>
                    <div className="text-sm text-muted-foreground">
                      Connected (12 devices)
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Configure</Button>
                    <Button variant="destructive" size="sm">Disconnect</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Hikvision System</Label>
                    <div className="text-sm text-muted-foreground">
                      Not connected
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Dahua NVR</Label>
                    <div className="text-sm text-muted-foreground">
                      Not connected
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="pt-2">
                  <Button className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Add New Camera System
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph mb-6">
              <CardHeader>
                <CardTitle>API Connections</CardTitle>
                <CardDescription>Manage API keys and external integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="webhook-url" 
                      defaultValue="https://api.yoursystem.com/webhook/surveil" 
                      className="bg-surveil-dark-300 border-surveil-dark-200 flex-1" 
                    />
                    <Button variant="outline">Test</Button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="api-key" 
                      type="password" 
                      defaultValue="sk_test_abcdefghijklmnopqrstuv" 
                      className="bg-surveil-dark-300 border-surveil-dark-200 flex-1" 
                    />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last used: 2 hours ago
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="allowed-origins">Allowed Origins</Label>
                  <Textarea 
                    id="allowed-origins" 
                    defaultValue="https://yourdomain.com
https://admin.yourdomain.com" 
                    className="bg-surveil-dark-300 border-surveil-dark-200 min-h-[100px]" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter one domain per line
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="flex items-center">
                <Link className="h-4 w-4 mr-2" />
                Save Integrations
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`bg-surveil-blue-500 text-white px-2 py-1 rounded-full text-xs ${className}`}>
      {children}
    </span>
  );
}
