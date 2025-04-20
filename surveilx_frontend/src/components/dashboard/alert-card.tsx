
import { AlertCircle, AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export type AlertSeverity = "critical" | "high" | "medium" | "low";

interface AlertCardProps {
  title: string;
  description: string;
  timestamp: string;
  severity: AlertSeverity;
  location: string;
  camera?: string;
}

export function AlertCard({
  title,
  description,
  timestamp,
  severity,
  location,
  camera
}: AlertCardProps) {
  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return "bg-surveil-emergency/10 border-surveil-emergency text-surveil-emergency";
      case "high":
        return "bg-surveil-warning/10 border-surveil-warning text-surveil-warning";
      case "medium":
        return "bg-surveil-blue-400/10 border-surveil-blue-400 text-surveil-blue-400";
      case "low":
        return "bg-surveil-green-500/10 border-surveil-green-500 text-surveil-green-500";
      default:
        return "bg-surveil-dark-300 border-surveil-dark-200";
    }
  };

  const getSeverityIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return AlertOctagon;
      case "high":
        return AlertTriangle;
      case "medium":
        return AlertCircle;
      case "low":
        return Info;
      default:
        return Info;
    }
  };

  const Icon = getSeverityIcon(severity);

  return (
    <div className={cn(
      "p-4 border rounded-lg mb-4 flex",
      getSeverityColor(severity)
    )}>
      <div className="mr-4">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base">{title}</h3>
          <Badge 
            variant="outline"
            className={cn("capitalize", {
              "border-surveil-emergency text-surveil-emergency": severity === "critical",
              "border-surveil-warning text-surveil-warning": severity === "high",
              "border-surveil-blue-400 text-surveil-blue-400": severity === "medium",
              "border-surveil-green-500 text-surveil-green-500": severity === "low",
            })}
          >
            {severity}
          </Badge>
        </div>
        <p className="text-sm opacity-80 mt-1">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2 text-xs opacity-70">
          <span>{timestamp}</span>
          <span>•</span>
          <span>{location}</span>
          {camera && (
            <>
              <span>•</span>
              <span>{camera}</span>
            </>
          )}
        </div>
        <div className="mt-3 flex space-x-2">
          <Button size="sm" className={cn(
            "bg-transparent border",
            severity === "critical" && "border-surveil-emergency hover:bg-surveil-emergency/10 text-surveil-emergency", 
            severity === "high" && "border-surveil-warning hover:bg-surveil-warning/10 text-surveil-warning",
            severity === "medium" && "border-surveil-blue-400 hover:bg-surveil-blue-400/10 text-surveil-blue-400",
            severity === "low" && "border-surveil-green-500 hover:bg-surveil-green-500/10 text-surveil-green-500",
          )}>
            View Details
          </Button>
          <Button size="sm" variant="ghost">Dismiss</Button>
        </div>
      </div>
    </div>
  );
}
