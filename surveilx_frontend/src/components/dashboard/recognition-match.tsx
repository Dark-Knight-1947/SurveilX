
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { AlertOctagon, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecognitionMatchProps {
  name: string;
  matchTime: string;
  confidenceScore: number;
  status: "match" | "unknown" | "alert";
  imageSrc: string;
  location: string;
  cameraId: string | number;
}

export function RecognitionMatch({
  name,
  matchTime,
  confidenceScore,
  status,
  imageSrc,
  location,
  cameraId,
}: RecognitionMatchProps) {
  const getStatusColor = (status: "match" | "unknown" | "alert") => {
    switch (status) {
      case "match":
        return "text-surveil-green-500 bg-surveil-green-500/10";
      case "unknown":
        return "text-surveil-blue-400 bg-surveil-blue-400/10";
      case "alert":
        return "text-surveil-emergency bg-surveil-emergency/10";
    }
  };

  const getStatusIcon = (status: "match" | "unknown" | "alert") => {
    switch (status) {
      case "match":
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case "unknown":
        return <Clock className="h-4 w-4 mr-1" />;
      case "alert":
        return <AlertOctagon className="h-4 w-4 mr-1" />;
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 95) return "text-surveil-green-500";
    if (score >= 85) return "text-surveil-blue-400";
    if (score >= 70) return "text-surveil-warning";
    return "text-surveil-emergency";
  };

  return (
    <Card className="neumorph overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Badge className={cn("flex items-center", getStatusColor(status))}>
            {getStatusIcon(status)}
            {status === "match" ? "Identified" : status === "unknown" ? "Unknown" : "Alert"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-20 w-20 rounded-md">
            <AvatarImage src={imageSrc} alt={name} className="object-cover" />
            <AvatarFallback className="rounded-md">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <span className={cn("text-sm font-medium", getConfidenceColor(confidenceScore))}>
                  {confidenceScore}%
                </span>
              </div>
              <Progress 
                value={confidenceScore} 
                className={cn("h-1.5", {
                  "bg-surveil-dark-300": true,
                  "[&>div]:bg-surveil-green-500": confidenceScore >= 95,
                  "[&>div]:bg-surveil-blue-400": confidenceScore >= 85 && confidenceScore < 95,
                  "[&>div]:bg-surveil-warning": confidenceScore >= 70 && confidenceScore < 85,
                  "[&>div]:bg-surveil-emergency": confidenceScore < 70,
                })}
              />
            </div>
            <div className="flex flex-col space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Detected at:</span>
                <span>{matchTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Camera ID:</span>
                <span>{cameraId}</span>
              </div>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 w-full"
        >
          View Details <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
}
