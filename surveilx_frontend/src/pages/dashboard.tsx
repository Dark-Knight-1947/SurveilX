import { AppLayout } from "@/components/layout/app-layout";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { AlertCard } from "@/components/dashboard/alert-card";
import {
  EmergencyButton,
  EmergencyCallButton,
} from "@/components/dashboard/emergency-button";
import { RecognitionMatch } from "@/components/dashboard/recognition-match";
import { useEffect, useState } from "react";
import {
  Bell,
  BarChart3,
  Camera,
  Clock,
  UserCheck,
  Users,
  ShieldCheck,
  AlertTriangle,
  Speaker,
  Megaphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [highlightedCamera, setHighlightedCamera] = useState<number | null>(
    null
  );

  // Mock camera feeds
  const cameraFeeds = [
    { id: 1, name: "DP Road", imageSrc: "" },
    { id: 2, name: "SAKEC - 7th Floor", imageSrc: "" },
    {
      id: 3,
      name: "Eastern Freeway",
      imageSrc: "https://image-timescontent.timesgroup.com/thumb/323727.webp",
    },
    {
      id: 4,
      name: "Govandi Railway Station",
      imageSrc:
        "https://content.jdmagicbox.com/v2/comp/mumbai/w7/022pxx22.xx22.110131150057.m8w7/catalogue/govandi-railway-station-govandi-west-mumbai-railway-station-SeG2aQqnzN.jpg",
    },
  ];

  const [deviceIds, setDeviceIds] = useState<{ cam1?: string; cam2?: string }>(
    {}
  );

  useEffect(() => {
    fetch("http://localhost:5000/detect-face", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Face detection result:", data);
        // show result, alert, overlay etc.
      })
      .catch((err) => {
        console.error("Detection error:", err);
      });

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === "videoinput");

      setDeviceIds({
        cam1: videoDevices[0]?.deviceId, // Laptop camera
      });
    });
  }, []);
  // Mock alerts
  const alerts = [
    {
      title: "Unauthorized Access",
      description: "Unidentified individual attempting to access secure area.",
      timestamp: "2 mins ago",
      severity: "critical",
      location: "East Entrance",
      camera: "CAM #1",
    },
    {
      title: "Crowd Density Alert",
      description: "Unusual gathering detected in lobby area.",
      timestamp: "15 mins ago",
      severity: "high",
      location: "Main Lobby",
      camera: "CAM #2",
    },
  ];

  // Mock recognition matches
  const recognitionMatches = [
    {
      name: "John Smith",
      matchTime: "09:45 AM Today",
      confidenceScore: 98,
      status: "match",
      imageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
      location: "East Entrance",
      cameraId: "CAM #1",
    },
    {
      name: "Unknown Person",
      matchTime: "09:32 AM Today",
      confidenceScore: 62,
      status: "alert",
      imageSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=200&h=200",
      location: "Rear Exit",
      cameraId: "CAM #4",
    },
  ];

  const [expandedCameraId, setExpandedCameraId] = useState<number | null>(null);

  return (
    <AppLayout
      title="Dashboard"
      subtitle="System overview and real-time monitoring"
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Camera Feeds - Left Side */}
        <div className="xl:col-span-3 space-y-6">
          <div
            className={
              expandedCameraId === null
                ? "grid gap-4 md:grid-cols-2 lg:grid-cols-2"
                : ""
            }
          >
            {expandedCameraId === null ? (
              cameraFeeds.map((camera) => (
                <CameraFeed
                  key={camera.id}
                  {...camera}
                  location={""}
                  highlighted={camera.id === highlightedCamera}
                  onExpand={() => setExpandedCameraId(camera.id)}
                  deviceId={
                    camera.id === 1
                      ? deviceIds.cam1
                      : camera.id === 2
                      ? deviceIds.cam2
                      : undefined
                  }
                />
              ))
            ) : (
              <CameraFeed
                key={expandedCameraId}
                {...cameraFeeds.find((c) => c.id === expandedCameraId)!}
                location={""}
                highlighted
                onExpand={() => setExpandedCameraId(null)} // collapse on click
                deviceId={
                  expandedCameraId === 1
                    ? deviceIds.cam1
                    : expandedCameraId === 2
                    ? deviceIds.cam2
                    : undefined
                }
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="neumorph col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Crowd Density Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                {/* Placeholder for crowd density chart */}
                <div className="text-center text-muted-foreground">
                  <p>Crowd Density Visualization</p>
                  <p className="text-sm">(Chart visualization would go here)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorph">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-green-500 mr-2"></div>
                      <span className="text-sm">Facial Recognition</span>
                    </div>
                    <span className="text-xs text-surveil-green-500">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-green-500 mr-2"></div>
                      <span className="text-sm">Analytics Engine</span>
                    </div>
                    <span className="text-xs text-surveil-green-500">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-warning mr-2"></div>
                      <span className="text-sm">Notification System</span>
                    </div>
                    <span className="text-xs text-surveil-warning">
                      Degraded
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-green-500 mr-2"></div>
                      <span className="text-sm">Voice Interface</span>
                    </div>
                    <span className="text-xs text-surveil-green-500">
                      Operational
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Recent Alerts
            </h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <AlertCard
                  key={index}
                  title={alert.title}
                  description={alert.description}
                  timestamp={alert.timestamp}
                  severity={alert.severity as never}
                  location={alert.location}
                  camera={alert.camera}
                />
              ))}
            </div>
          </div>

          {/* Facial Recognition */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Recent Identifications
            </h3>
            <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
