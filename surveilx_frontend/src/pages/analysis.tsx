
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  BarChart3, 
  Calendar, 
  Download, 
  File, 
  Filter, 
  MapPin,
  Users 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AnalysisPage() {
  const crowdStats = [
    {
      title: "Current Occupancy",
      value: "284",
      percentage: "71%",
      change: "+23 people",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Average Wait Time",
      value: "4.2m",
      percentage: null,
      change: "-12% from usual",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "High Density Areas",
      value: "3",
      percentage: null,
      change: "Main Entrance, Lobby, Cafeteria",
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  return (
    <AppLayout title="Analysis" subtitle="Crowd density and accident analytics">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {crowdStats.map((stat, i) => (
            <Card key={i} className="neumorph">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-baseline">
                  {stat.value}
                  {stat.percentage && (
                    <span className="ml-2 text-sm text-muted-foreground">({stat.percentage})</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="crowd">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <TabsList className="neumorph-inset">
              <TabsTrigger value="crowd">Crowd Density</TabsTrigger>
              <TabsTrigger value="accident">Accident Analysis</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Select defaultValue="24h">
                <SelectTrigger className="w-[160px] bg-surveil-dark-300 border-surveil-dark-200">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="crowd">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Crowd Density Chart */}
              <Card className="neumorph col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AreaChart className="h-4 w-4 mr-2" />
                    Density Plot
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Crowd Density Chart</p>
                    <p className="text-sm">(Area chart visualization would go here)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Heatmap */}
              <Card className="neumorph">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Crowd Density over Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Building Plot</p>
                    <p className="text-sm">(Heatmap visualization would go here)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Zone Analysis */}
              <Card className="neumorph">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Zone Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Zone Occupancy</p>
                    <p className="text-sm">(Bar chart visualization would go here)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Predictions */}
              <Card className="neumorph col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AreaChart className="h-4 w-4 mr-2" />
                    Predictive Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Crowd Prediction</p>
                    <p className="text-sm">(Line chart with prediction would go here)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accident">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Accident Trend Chart */}
              <Card className="neumorph col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AreaChart className="h-4 w-4 mr-2" />
                    Incident Trend Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Incident Frequency Chart</p>
                    <p className="text-sm">(Line chart visualization would go here)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Incident Map */}
              <Card className="neumorph">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Incident Location Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Incident Heatmap</p>
                    <p className="text-sm">(Map visualization would go here)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Incidents */}
              <Card className="neumorph col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <File className="h-4 w-4 mr-2" />
                    Recent Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-surveil-dark-300">
                        <tr>
                          <th scope="col" className="px-6 py-3">Incident ID</th>
                          <th scope="col" className="px-6 py-3">Type</th>
                          <th scope="col" className="px-6 py-3">Location</th>
                          <th scope="col" className="px-6 py-3">Date & Time</th>
                          <th scope="col" className="px-6 py-3">Severity</th>
                          <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-surveil-dark-300">
                          <td className="px-6 py-4">INC-2023-0428</td>
                          <td className="px-6 py-4">Trip & Fall</td>
                          <td className="px-6 py-4">Main Lobby</td>
                          <td className="px-6 py-4">Apr 28, 2023 - 14:32</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-surveil-warning/20 text-surveil-warning">Medium</span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                        <tr className="border-b border-surveil-dark-300">
                          <td className="px-6 py-4">INC-2023-0415</td>
                          <td className="px-6 py-4">Unauthorized Access</td>
                          <td className="px-6 py-4">Secure Area B</td>
                          <td className="px-6 py-4">Apr 15, 2023 - 23:18</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-surveil-emergency/20 text-surveil-emergency">High</span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                        <tr className="border-b border-surveil-dark-300">
                          <td className="px-6 py-4">INC-2023-0410</td>
                          <td className="px-6 py-4">Object Left Behind</td>
                          <td className="px-6 py-4">East Entrance</td>
                          <td className="px-6 py-4">Apr 10, 2023 - 09:42</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-surveil-blue-400/20 text-surveil-blue-400">Low</span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="neumorph">
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto rounded-md">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-surveil-dark-300">
                      <tr>
                        <th scope="col" className="px-6 py-3">Report Name</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Generated On</th>
                        <th scope="col" className="px-6 py-3">Generated By</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">Monthly Security Summary</td>
                        <td className="px-6 py-4">Security</td>
                        <td className="px-6 py-4">May 1, 2023</td>
                        <td className="px-6 py-4">System</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">Visitor Traffic Analysis</td>
                        <td className="px-6 py-4">Analytics</td>
                        <td className="px-6 py-4">Apr 28, 2023</td>
                        <td className="px-6 py-4">John Smith</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-surveil-dark-300">
                        <td className="px-6 py-4">Incident Response Times</td>
                        <td className="px-6 py-4">Operations</td>
                        <td className="px-6 py-4">Apr 15, 2023</td>
                        <td className="px-6 py-4">Sarah Williams</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button>Generate New Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
