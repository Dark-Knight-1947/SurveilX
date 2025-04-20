
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, 
  Download,
  Play, 
  Plus, 
  Search, 
  Settings, 
  ShieldAlert, 
  Upload, 
  UserPlus, 
  Users, 
  XCircle 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function AdminPage() {
  return (
    <AppLayout title="Admin Panel" subtitle="System administration and user management">
      <Tabs defaultValue="users">
        <div className="flex overflow-x-auto mb-6">
          <TabsList className="neumorph-inset">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="cameras">Camera Administration</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Users & Permissions</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Input 
                  type="search" 
                  placeholder="Search users..." 
                  className="bg-surveil-dark-300 border-surveil-dark-200 pr-8 w-full"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <Button className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <Card className="neumorph">
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-surveil-dark-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">User</th>
                      <th scope="col" className="px-6 py-3">Role</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Last Active</th>
                      <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-surveil-dark-300">
                      <td className="px-6 py-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-surveil-blue-400 flex items-center justify-center text-white mr-3">
                          JS
                        </div>
                        <div>
                          <div className="font-medium">John Smith</div>
                          <div className="text-xs text-muted-foreground">john.smith@company.com</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-surveil-blue-500/20 text-surveil-blue-400">
                          Administrator
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="status-dot text-surveil-green-500 mr-2"></div>
                          Active
                        </div>
                      </td>
                      <td className="px-6 py-4">Now</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Disable</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-surveil-dark-300">
                      <td className="px-6 py-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-surveil-green-600 flex items-center justify-center text-white mr-3">
                          SW
                        </div>
                        <div>
                          <div className="font-medium">Sarah Williams</div>
                          <div className="text-xs text-muted-foreground">sarah.w@company.com</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-surveil-green-500/20 text-surveil-green-500">
                          Security Manager
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="status-dot text-surveil-green-500 mr-2"></div>
                          Active
                        </div>
                      </td>
                      <td className="px-6 py-4">2 hours ago</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Disable</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-surveil-dark-300">
                      <td className="px-6 py-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-surveil-dark-100 flex items-center justify-center text-white mr-3">
                          DJ
                        </div>
                        <div>
                          <div className="font-medium">David Johnson</div>
                          <div className="text-xs text-muted-foreground">david.j@company.com</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                          Operator
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="status-dot text-gray-500 mr-2"></div>
                          Inactive
                        </div>
                      </td>
                      <td className="px-6 py-4">3 days ago</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-green-500">Enable</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <div className="grid gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold">AI Model Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Model
                </Button>
                <Button className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Training
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="neumorph">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-surveil-green-500" />
                      Facial Recognition v3.2
                    </div>
                    <Badge className="bg-surveil-green-500">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Accuracy:</div>
                      <div className="text-right">94.7%</div>
                      <div className="text-muted-foreground">Trained on:</div>
                      <div className="text-right">125,342 samples</div>
                      <div className="text-muted-foreground">Last updated:</div>
                      <div className="text-right">2 weeks ago</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">Configure</Button>
                      <Button variant="secondary" size="sm" className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neumorph">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-surveil-green-500" />
                      Crowd Analysis v2.8
                    </div>
                    <Badge className="bg-surveil-green-500">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Accuracy:</div>
                      <div className="text-right">92.1%</div>
                      <div className="text-muted-foreground">Trained on:</div>
                      <div className="text-right">87,921 samples</div>
                      <div className="text-muted-foreground">Last updated:</div>
                      <div className="text-right">1 month ago</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">Configure</Button>
                      <Button variant="secondary" size="sm" className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neumorph">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 mr-2 text-gray-500" />
                      Behavior Detection v1.4
                    </div>
                    <Badge className="bg-gray-500">Disabled</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Accuracy:</div>
                      <div className="text-right">87.3%</div>
                      <div className="text-muted-foreground">Trained on:</div>
                      <div className="text-right">45,678 samples</div>
                      <div className="text-muted-foreground">Last updated:</div>
                      <div className="text-right">3 months ago</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">Configure</Button>
                      <Button variant="secondary" size="sm" className="flex items-center">
                        <Play className="h-3 w-3 mr-1" />
                        Activate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="neumorph">
              <CardHeader>
                <CardTitle>Training Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-surveil-dark-300">
                      <tr>
                        <th scope="col" className="px-6 py-3">Model</th>
                        <th scope="col" className="px-6 py-3">Dataset Size</th>
                        <th scope="col" className="px-6 py-3">Training Status</th>
                        <th scope="col" className="px-6 py-3">Scheduled Date</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">Facial Recognition v3.3</td>
                        <td className="px-6 py-4">145,278 samples</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-surveil-blue-400">Scheduled</Badge>
                        </td>
                        <td className="px-6 py-4">May 15, 2023</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                        </td>
                      </tr>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">Object Detection v2.1</td>
                        <td className="px-6 py-4">98,432 samples</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-surveil-warning">Preparing</Badge>
                        </td>
                        <td className="px-6 py-4">May 10, 2023</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cameras">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Camera Management</h2>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Camera
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="neumorph">
              <CardHeader>
                <CardTitle>Camera Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-around mb-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-surveil-green-500 mb-1">12</div>
                    <div className="text-sm text-muted-foreground">Online</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-surveil-emergency mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Offline</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-surveil-warning mb-1">2</div>
                    <div className="text-sm text-muted-foreground">Maintenance</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">17</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>

                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Cameras Location Map</p>
                    <p className="text-sm">(Map visualization would go here)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph">
              <CardHeader>
                <CardTitle>Camera Configuration</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-surveil-dark-300">
                      <tr>
                        <th scope="col" className="px-6 py-3">Camera ID</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Features</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">CAM #1</td>
                        <td className="px-6 py-4">East Entrance</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="status-dot text-surveil-green-500 mr-2"></div>
                            Online
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-1">
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-blue-500/20 text-surveil-blue-400">FR</span>
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-green-500/20 text-surveil-green-500">Motion</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">CAM #2</td>
                        <td className="px-6 py-4">Main Lobby</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="status-dot text-surveil-green-500 mr-2"></div>
                            Online
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-1">
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-blue-500/20 text-surveil-blue-400">FR</span>
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-green-500/20 text-surveil-green-500">Motion</span>
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-warning/20 text-surveil-warning">Crowd</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">CAM #3</td>
                        <td className="px-6 py-4">Parking Lot</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="status-dot text-surveil-warning mr-2"></div>
                            Maintenance
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-1">
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-blue-500/20 text-surveil-blue-400">FR</span>
                            <span className="px-1 py-0.5 rounded text-xs bg-surveil-warning/20 text-surveil-warning">LPR</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="neumorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <div className="mt-2 h-2 w-full bg-surveil-dark-300 rounded-full overflow-hidden">
                  <div className="bg-surveil-blue-500 h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <div className="mt-2 h-2 w-full bg-surveil-dark-300 rounded-full overflow-hidden">
                  <div className="bg-surveil-warning h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8 TB / 8 TB</div>
                <div className="mt-2 h-2 w-full bg-surveil-dark-300 rounded-full overflow-hidden">
                  <div className="bg-surveil-green-500 h-full rounded-full" style={{ width: '47.5%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="neumorph">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Facial Recognition Service</div>
                    <div className="text-sm text-muted-foreground">Primary AI processing unit</div>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot text-surveil-green-500 mr-2"></div>
                    Healthy
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Database Server</div>
                    <div className="text-sm text-muted-foreground">Storage and retrieval services</div>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot text-surveil-green-500 mr-2"></div>
                    Healthy
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Video Processing Server</div>
                    <div className="text-sm text-muted-foreground">Real-time feed analysis</div>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot text-surveil-warning mr-2"></div>
                    High Load
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Notification Service</div>
                    <div className="text-sm text-muted-foreground">Alert distribution system</div>
                  </div>
                  <div className="flex items-center">
                    <div className="status-dot text-surveil-warning mr-2"></div>
                    Degraded
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  System Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Active Sessions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Failed Logins Today</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-sm text-muted-foreground">API Requests/min</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">99.8%</div>
                      <div className="text-sm text-muted-foreground">Uptime (30 days)</div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Maintenance Mode</div>
                      <Switch id="maintenance-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Emergency Access Only</div>
                      <Switch id="emergency-only" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Allow New Registrations</div>
                      <Switch id="allow-registrations" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs text-white ${className}`}>
      {children}
    </span>
  );
}
