
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-surveil-dark-400">
        <AppSidebar />
        <MainContent title={title} subtitle={subtitle}>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
}

function MainContent({ 
  children, 
  title, 
  subtitle 
}: { 
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const sidebar = useSidebar();
  const expanded = sidebar.expanded;

  return (
    <main
      className={cn(
        "flex-1 transition-all duration-300",
        expanded ? "ml-64" : "ml-16"
      )}
    >
      <Header title={title} subtitle={subtitle} />
      <div className="p-4 md:p-8">
        {children}
      </div>
    </main>
  );
}
