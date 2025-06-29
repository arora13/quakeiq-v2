
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { HomePage } from "@/pages/HomePage";
import { RiskAssessment } from "@/pages/RiskAssessment";
import { LiveAlerts } from "@/pages/LiveAlerts";
import { PersonalPlan } from "@/pages/PersonalPlan";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/risk-assessment" element={<RiskAssessment />} />
                <Route path="/live-alerts" element={<LiveAlerts />} />
                <Route path="/personal-plan" element={<PersonalPlan />} />
                <Route path="/ai-plan" element={<PersonalPlan />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
