
import { AppLayout } from "@/components/layout/app-layout";
import { AlertCard, AlertSeverity } from "@/components/dashboard/alert-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertOctagon, Calendar, Download, Filter, Search } from "lucide-react";

interface Alert {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  severity: AlertSeverity;
  location: string;
  camera?: string;
  acknowledged: boolean;
}

export default function AlertsPage() {
  // Mock alerts data
  const alerts: Alert[] = [
    { 
      id: 1,
      title: "Unauthorized Access", 
      description: "Unidentified individual attempting to access secure area.", 
      timestamp: "2 mins ago", 
      severity: "critical", 
      location: "East Entrance", 
      camera: "CAM #1",
      acknowledged: false
    },
    { 
      id: 2,
      title: "Crowd Density Alert", 
      description: "Unusual gathering detected in lobby area.", 
      timestamp: "15 mins ago", 
      severity: "high", 
      location: "Main Lobby", 
      camera: "CAM #2",
      acknowledged: false
    },
    { 
      id: 3,
      title: "Object Left Behind", 
      description: "Unattended package detected near entrance.", 
      timestamp: "45 mins ago", 
      severity: "medium", 
      location: "Main Entrance", 
      camera: "CAM #12",
      acknowledged: false
    },
    { 
      id: 4,
      title: "Camera Offline", 
      description: "Camera #8 (Reception) has gone offline unexpectedly.", 
      timestamp: "1 hour ago", 
      severity: "medium", 
      location: "System",
      acknowledged: true
    },
    { 
      id: 5,
      title: "Facial Recognition Match", 
      description: "High confidence match for watchlist individual.", 
      timestamp: "1.5 hours ago", 
      severity: "high", 
      location: "Parking Lot", 
      camera: "CAM #3",
      acknowledged: true
    },
    { 
      id: 6,
      title: "System Update", 
      description: "New facial recognition database update available.", 
      timestamp: "3 hours ago", 
      severity: "low", 
      location: "System",
      acknowledged: true
    },
    { 
      id: 7,
      title: "Restricted Area Breach", 
      description: "Unauthorized access to server room detected.", 
      timestamp: "5 hours ago", 
      severity: "critical", 
      location: "Server Room",
      camera: "CAM #6",
      acknowledged: true
    },
  ];

  const unacknowledgedAlerts = alerts.filter((alert) => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter((alert) => alert.acknowledged);

  // Alert stats
  const alertStats = [
    {
      title: "Critical",
      value: alerts.filter(a => a.severity === "critical").length,
      percentage: "14%",
      change: "+1 from yesterday",
      className: "text-surveil-emergency",
    },
    {
      title: "High",
      value: alerts.filter(a => a.severity === "high").length,
      percentage: "29%",
      change: "No change",
      className: "text-surveil-warning",
    },
    {
      title: "Medium",
      value: alerts.filter(a => a.severity === "medium").length,
      percentage: "29%",
      change: "-2 from yesterday",
      className: "text-surveil-blue-400",
    },
    {
      title: "Low",
      value: alerts.filter(a => a.severity === "low").length,
      percentage: "29%",
      change: "+1 from yesterday",
      className: "text-surveil-green-500",
    },
  ];

  return (
    <AppLayout title="Alerts" subtitle="Manage and respond to system alerts">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alertStats.map((stat, i) => (
            <Card key={i} className="neumorph">
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-medium flex items-center ${stat.className}`}>
                  <AlertOctagon className="h-4 w-4 mr-2" />
                  {stat.title} Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-baseline">
                  {stat.value}
                  <span className="ml-2 text-sm text-muted-foreground">({stat.percentage})</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input 
                type="search" 
                placeholder="Search alerts..." 
                className="bg-surveil-dark-300 border-surveil-dark-200 pr-8 w-full sm:w-64"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] bg-surveil-dark-300 border-surveil-dark-200">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Alerts
          </Button>
        </div>

        {/* Alerts Tabs */}
        <Tabs defaultValue="active">
          <TabsList className="neumorph-inset mb-6">
            <TabsTrigger value="active" className="relative">
              Active
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-surveil-emergency text-white text-xs flex items-center justify-center">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {unacknowledgedAlerts.length === 0 ? (
              <Card className="neumorph">
                <CardHeader>
                  <CardTitle>No Active Alerts</CardTitle>
                  <CardDescription>There are currently no active alerts that require attention.</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="space-y-4">
                {unacknowledgedAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    title={alert.title}
                    description={alert.description}
                    timestamp={alert.timestamp}
                    severity={alert.severity}
                    location={alert.location}
                    camera={alert.camera}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="acknowledged">
            <div className="space-y-4">
              {acknowledgedAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  title={alert.title}
                  description={alert.description}
                  timestamp={alert.timestamp}
                  severity={alert.severity}
                  location={alert.location}
                  camera={alert.camera}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  title={alert.title}
                  description={alert.description}
                  timestamp={alert.timestamp}
                  severity={alert.severity}
                  location={alert.location}
                  camera={alert.camera}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
