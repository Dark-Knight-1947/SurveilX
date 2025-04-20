
import { AppLayout } from "@/components/layout/app-layout";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Filter, Grid, LayoutGrid, List, Search } from "lucide-react";

export default function CameraFeedsPage() {
  // Mock camera feeds
  const cameraFeeds = [
    { id: 1, name: "SAKEC - 609",  imageSrc: "" },
    { id: 2, name: "SAKEC - 7th Floor",  imageSrc: "" },
    { id: 3, name: "SAKEC - 6th Floor",  imageSrc: "" },
    { id: 4, name: "SAKEC - 5th Floor",  imageSrc: "" },
    { id: 5, name: "SAKEC - 4th Floor",  imageSrc: "" },
    { id: 6, name: "SAKEC Library",  imageSrc: "https://www.sakec.ac.in/wp-content/uploads/2025/03/L4.jpg" },
    { id: 7, name: "SAKEC Canteen",  imageSrc: "" },
    { id: 8, name: "SAKEC Auditorium",  imageSrc: "" },
    { id: 9, name: "VN Purav Marg", imageSrc: "" },
    { id: 10, name: "DP Road",  imageSrc: "" },
    { id: 11, name: "Govandi Railway Station",  imageSrc: "https://content.jdmagicbox.com/v2/comp/mumbai/w7/022pxx22.xx22.110131150057.m8w7/catalogue/govandi-railway-station-govandi-west-mumbai-railway-station-SeG2aQqnzN.jpg" },
    { id: 12, name: "Eastern Freeway", imageSrc: "https://image-timescontent.timesgroup.com/thumb/323727.webp" },
  ];

  // Layout options
  const layoutOptions = [
    { value: "2x2", label: "2x2 Grid", cols: "grid-cols-1 md:grid-cols-2" },
    { value: "3x2", label: "3x2 Grid", cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
    { value: "4x3", label: "4x3 Grid", cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
  ];

  const [layout, setLayout] = useState(layoutOptions[2]);
  const [expandedCamera, setExpandedCamera] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <AppLayout title="Camera Feeds" subtitle="Real-time monitoring of all connected cameras">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            {layoutOptions.map((option) => (
              <Button
                key={option.value}
                variant={layout.value === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setLayout(option)}
                className="flex items-center"
              >
                {option.value === "2x2" && <Grid className="h-4 w-4 mr-2" />}
                {option.value === "3x2" && <LayoutGrid className="h-4 w-4 mr-2" />}
                {option.value === "4x3" && <List className="h-4 w-4 mr-2" />}
                {option.label}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input 
                type="search" 
                placeholder="Search cameras..." 
                className="bg-surveil-dark-300 border-surveil-dark-200 pr-8 w-full sm:w-60"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Camera Grid */}
        <div className={`grid ${layout.cols} gap-4`}>
          {cameraFeeds.map((camera) => (
            <CameraFeed
              location={""} key={camera.id}
              {...camera}
              onExpand={() => {
                setExpandedCamera(camera.id);
                setDialogOpen(true);
              } }            />
          ))}
        </div>

        {/* Expanded Camera Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-5xl bg-surveil-dark-400 border-surveil-dark-300">
            <DialogHeader>
              <DialogTitle>
                {expandedCamera !== null && 
                  cameraFeeds.find(cam => cam.id === expandedCamera)?.name
                }
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                {expandedCamera !== null && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={cameraFeeds.find(cam => cam.id === expandedCamera)?.imageSrc}
                      alt="Camera feed"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 live-indicator">
                      LIVE
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <Card className="neumorph">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Camera Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {expandedCamera !== null && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Camera ID:</span>
                          <span>CAM #{expandedCamera}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>
                            {cameraFeeds.find(cam => cam.id === expandedCamera)?.location}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="flex items-center">
                            <div className="status-dot text-surveil-green-500 mr-1"></div>
                            Online
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resolution:</span>
                          <span>1080p</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frame Rate:</span>
                          <span>30fps</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="neumorph">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Crowd Density:</span>
                      <div className="w-32 h-2 bg-surveil-dark-300 rounded-full overflow-hidden">
                        <div className="h-full bg-surveil-blue-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Movement:</span>
                      <div className="w-32 h-2 bg-surveil-dark-300 rounded-full overflow-hidden">
                        <div className="h-full bg-surveil-green-500" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Faces Detected:</span>
                      <span>4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-surveil-blue-500/20 text-surveil-blue-400">
                        Low
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
