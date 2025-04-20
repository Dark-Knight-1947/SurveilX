import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Expand } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CameraFeedProps {
  id: number;
  name: string;
  location: string;
  imageSrc: string;
  deviceId?: string;
  live?: boolean;
  highlighted?: boolean;
  onExpand?: () => void;
}

export function CameraFeed({
  id,
  name,
  location,
  imageSrc,
  deviceId,
  live = true,
  highlighted = false,
  onExpand,
}: CameraFeedProps) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    if (videoRef.current && live && deviceId) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: deviceId } },
          audio: false,
        })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(console.error);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [deviceId, live]);

  return (
    <Card className={cn("overflow-hidden neumorph h-full transition-all duration-300")}>
      <CardContent className="p-0 relative">
        {/* Camera Feed Image */}
        <div className="aspect-video relative overflow-hidden bg-black">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`Camera feed from ${name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              muted={muted}
              autoPlay
              className="w-full h-full object-cover"
            />
          )}

          {/* Live Indicator */}
          {live && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              LIVE
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
            <div>
              <p className="text-white text-sm font-medium truncate">{name}</p>
              <p className="text-gray-300 text-xs truncate">{location}</p>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={onExpand}
              >
                <Expand className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Camera ID Badge */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            CAM #{id}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
