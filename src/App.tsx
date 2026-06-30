import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

// Code-split pages for performance
const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((m) => ({ default: m.SearchPage }))
);
const ProfileDetailPage = lazy(() =>
  import("@/pages/ProfileDetailPage").then((m) => ({
    default: m.ProfileDetailPage,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="page-loader">
      <Loader2 size={32} className="detail-spinner" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route
                path="/profile/:username"
                element={<ProfileDetailPage />}
              />
            </Routes>
          </Suspense>
        </AppLayout>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(30, 41, 59, 0.95)",
              color: "#f1f5f9",
              border: "1px solid rgba(148, 163, 184, 0.1)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
