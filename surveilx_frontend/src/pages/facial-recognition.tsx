
import { AppLayout } from "@/components/layout/app-layout";
import { RecognitionMatch } from "@/components/dashboard/recognition-match";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  CheckCircle2, 
  Download,
  Filter,
  Scan,
  Search,
  UserCheck 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FacialRecognitionPage() {
  // Mock recognition matches
  const recognitionMatches = [
    {
      name: "John Smith",
      matchTime: "09:45 AM Today",
      confidenceScore: 98,
      status: "match",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
      location: "East Entrance",
      cameraId: "CAM #1",
    },
    {
      name: "David Johnson",
      matchTime: "09:40 AM Today",
      confidenceScore: 96,
      status: "match",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200",
      location: "Main Lobby",
      cameraId: "CAM #2",
    },
    {
      name: "Unknown Person",
      matchTime: "09:32 AM Today",
      confidenceScore: 62,
      status: "alert",
      imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=200&h=200",
      location: "Rear Exit",
      cameraId: "CAM #4",
    },
    {
      name: "Sarah Williams",
      matchTime: "09:22 AM Today",
      confidenceScore: 94,
      status: "match",
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=200&h=200",
      location: "Building A Entrance",
      cameraId: "CAM #5",
    },
    {
      name: "Unknown Person",
      matchTime: "09:15 AM Today",
      confidenceScore: 75,
      status: "unknown",
      imageSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=200&h=200",
      location: "Parking Lot",
      cameraId: "CAM #3",
    },
    {
      name: "Michael Brown",
      matchTime: "08:55 AM Today",
      confidenceScore: 91,
      status: "match",
      imageSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?fit=crop&w=200&h=200",
      location: "Building B Entrance",
      cameraId: "CAM #6",
    },
  ];

  // Stats data
  const stats = [
    {
      title: "Total Identifications",
      value: "1,284",
      change: "+12.5%",
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      title: "Positive Matches",
      value: "863",
      change: "+8.2%",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      title: "Recognition Accuracy",
      value: "94.7%",
      change: "+2.1%",
      icon: <Scan className="h-4 w-4" />,
    },
  ];

  return (
    <AppLayout title="Facial Recognition" subtitle="Identity verification and tracking system">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="neumorph">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-surveil-green-500">
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="recent">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <TabsList className="neumorph-inset">
              <TabsTrigger value="recent">Recent Matches</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Search matches..." 
                  className="w-full sm:w-60 bg-surveil-dark-300 border-surveil-dark-200 pr-8"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
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

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recognitionMatches.map((match, index) => (
                <RecognitionMatch
                  key={index}
                  name={match.name}
                  matchTime={match.matchTime}
                  confidenceScore={match.confidenceScore}
                  status={match.status as never}
                  imageSrc={match.imageSrc}
                  location={match.location}
                  cameraId={match.cameraId}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="watchlist">
            <Card className="neumorph">
              <CardHeader>
                <CardTitle>Watchlist Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input 
                      placeholder="Search watchlist..." 
                      className="bg-surveil-dark-300 border-surveil-dark-200"
                    />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[180px] bg-surveil-dark-300 border-surveil-dark-200">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                        <SelectItem value="vip">VIPs</SelectItem>
                        <SelectItem value="employees">Employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Add Person</Button>
                  </div>
                  
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-2">Select a category to view the watchlist</p>
                    <p className="text-sm">
                      Manage individuals to monitor through the surveillance system
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card className="neumorph">
              <CardHeader>
                <CardTitle>Upload Image for Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-surveil-dark-200 rounded-lg p-12 text-center">
                    <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-surveil-dark-300 mb-4">
                      <Scan className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 font-medium">Drag & drop an image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Support for JPG, PNG with clear facial visibility
                    </p>
                    <Button>Select File</Button>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-px flex-1 bg-surveil-dark-200"></div>
                    <span className="px-4 text-xs text-muted-foreground">OR</span>
                    <div className="h-px flex-1 bg-surveil-dark-200"></div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label>Image URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter image URL..." 
                        className="flex-1 bg-surveil-dark-300 border-surveil-dark-200"
                      />
                      <Button>Analyze</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </div>
  )
}
