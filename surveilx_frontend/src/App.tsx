import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import FacialRecognitionPage from "./pages/facial-recognition";
import AnalysisPage from "./pages/analysis";
import SettingsPage from "./pages/settings";
import AdminPage from "./pages/admin";
import CameraFeedsPage from "./pages/camera-feeds";
import AlertsPage from "./pages/alerts";
import SignUpPage from "./pages/signUp";
import ProfilePage from "./pages/profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/camera-feeds" element={<CameraFeedsPage />} />
          <Route path="/facial-recognition" element={<FacialRecognitionPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
