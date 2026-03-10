import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WardrobeDashboard from "./pages/WardrobeDashboard";
import OutfitGenerator from "./pages/OutfitGenerator";
import VirtualTryOn from "./pages/VirtualTryOn";
import ShoppingPage from "./pages/ShoppingPage";
import TravelPacking from "./pages/TravelPacking";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />     
          <Route path="/wardrobe" element={<WardrobeDashboard />} />
          <Route path="/outfit-generator" element={<OutfitGenerator />} />
          <Route path="/virtual-tryon" element={<VirtualTryOn />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/travel-packing" element={<TravelPacking />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
