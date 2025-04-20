
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Bell,
  Camera,
  Cog,
  FileBarChart,
  Home,
  LayoutGrid,
  LogOut, 
  Scan, 
  Shield, 
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const [showLogo, setShowLogo] = useState(true);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Camera Feeds",
      icon: Camera,
      path: "/camera-feeds",
    },
    {
      title: "Facial Recognition",
      icon: Scan,
      path: "/facial-recognition",
    },
    {
      title: "Analysis",
      icon: FileBarChart,
      path: "/analysis",
    },
    {
      title: "Alerts",
      icon: Bell,
      path: "/alerts",
    },
    {
      title: "Settings",
      icon: Cog,
      path: "/settings",
    },
    {
      title: "Admin Panel",
      icon: Shield,
      path: "/admin",
    },
  ];

  return (
    <Sidebar 
      onTransitionEnd={() => setShowLogo(prev => !prev)} 
      className="bg-surveil-dark-300 border-surveil-dark-200"
    >
      <SidebarHeader>
        <div className="flex items-center">
          <div className="rounded-full bg-surveil-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold">
            SX
          </div>
          <span className="ml-2 font-bold text-lg text-white whitespace-nowrap overflow-hidden transition-all">
            SurveilX
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={cn({
                        "bg-sidebar-accent": location.pathname === item.path,
                        "text-surveil-blue-400": location.pathname === item.path,
                      })}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/profile" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <Users className="w-5 h-5" />
                <span className="ml-3">Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/login" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
