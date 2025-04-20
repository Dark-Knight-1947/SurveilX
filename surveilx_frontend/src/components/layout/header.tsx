
import { Bell, Mic, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recognition logic
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-4 md:px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">

        
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-surveil-emergency" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-surveil-dark-300 border-surveil-dark-200">
            <div className="flex items-center justify-between p-4">
              <span className="font-medium">Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div className="flex gap-4">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-surveil-emergency shrink-0" />
                  <div>
                    <p className="font-medium">Unauthorized Access Detected</p>
                    <p className="text-sm text-muted-foreground">Camera #4 - East Entrance</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div className="flex gap-4">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-surveil-warning shrink-0" />
                  <div>
                    <p className="font-medium">Unusual Crowd Gathering</p>
                    <p className="text-sm text-muted-foreground">Camera #2 - Main Lobby</p>
                    <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div className="flex gap-4">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-surveil-info shrink-0" />
                  <div>
                    <p className="font-medium">System Update Available</p>
                    <p className="text-sm text-muted-foreground">Version 2.4.1</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Button variant="ghost" size="sm" className="text-xs w-full">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
