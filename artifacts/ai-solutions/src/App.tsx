import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useTheme } from "@/hooks/use-theme";

// Pages
import Home from "@/pages/Home";
import Solutions from "@/pages/Solutions";
import Industries from "@/pages/Industries";
import Testimonials from "@/pages/Testimonials";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/industries" component={Industries} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:id" component={ArticleDetail} />
      <Route path="/events" component={Events} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useTheme(); // Enforce dark mode always

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
