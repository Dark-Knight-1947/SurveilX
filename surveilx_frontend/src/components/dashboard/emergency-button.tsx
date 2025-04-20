
import { Button } from "../ui/button";
import { Phone, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  icon?: React.ReactNode;
  label: string;
  className?: string;
}

export function EmergencyButton({
  icon = <AlertTriangle className="mr-2 h-4 w-4" />,
  label,
  className,
}: EmergencyButtonProps) {
  return (
    <Button 
      variant="destructive"
      size="lg"
      className={cn(
        "w-full h-14 text-base font-bold shadow-lg hover:brightness-110 transition-all",
        className
      )}
      onClick={() => {
        // Handle emergency action
        console.log(`Emergency action: ${label}`);
      }}
    >
      {icon}
      {label}
    </Button>
  );
}

export function EmergencyCallButton() {
  return (
    <EmergencyButton
      icon={<Phone className="mr-2 h-4 w-4" />}
      label="Emergency Call"
      className="bg-surveil-emergency hover:bg-surveil-emergency/90"
    />
  );
}
