import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InventarisationCalc from "./pages/InventarisationCalc";
import FormWallCalc from "./pages/FormWallCalc";
import ThankYouVariant from "./pages/ThankYouVariant";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inventarisation-calc/:variant" element={<InventarisationCalc />} />
          <Route path="/inventarisation-calc/:variant/test" element={<InventarisationCalc isTestMode />} />
          <Route path="/inventarisation-calc/formwall" element={<FormWallCalc />} />
          <Route path="/thank-you/inventarisation-calc/:variant" element={<ThankYouVariant />} />
          {/* Backwards compatibility routes */}
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
