import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Onboarding from "./pages/Onboarding";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/notFoundPage";
import SearchPage from "./pages/SearchPage";
import ResultRage from "./pages/ResultsPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "./queries/user.queries";
import { useUserStore } from "./store/user.store";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
    if (token) {
      queryClient
        .fetchQuery({ queryKey: ["user"], queryFn: getUser })
        .then((user) => setUser(user))
        .catch(() => {});
    }
  }, [queryClient, setUser]);
  function ProtectedOnboarding() {
    const [cookies] = useCookies(["access_token"]);
    if (cookies.access_token) {
      return <Navigate to="/home" replace />;
    }
    return <Onboarding />;
  }

  return (
    <ErrorBoundary>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Router>
        <Routes>
          <Route path="/" element={<ProtectedOnboarding />} />
          <Route path="/auth" element={<Onboarding />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultRage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Fallback route */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
