import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Budget from "./pages/MonthlyBudget";
import ReportPage from "./pages/ReportPage";
import Profile from "./pages/Profile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Guide = lazy(() => import("./pages/Guide"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const AIChatBot = lazy(() => import("./pages/AIChatBot"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProtectedRoute = lazy(
  () => import("./components/dashboard/ProtectedRoute")
);
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Loading = lazy(() => import("./pages/Loading"));
const RecurringTransactions = lazy(
  () => import("./pages/RecurringTransactions")
);
const SpecialBudgetsPage = lazy(() => import("./pages/SpecialBudgets"));
const SavingsPage = lazy(() => import("./pages/Savings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
    },
  },
});
export default function App() {
  const routes = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/guide", element: <Guide /> },
        { path: "/about", element: <About /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/login", element: <Login /> },
        { path: "/*", element: <NotFound /> },
      ],
    },
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/transactions", element: <Transactions /> },
        { path: "/budgets", element: <Budget /> },
        { path: "/special-budgets", element: <SpecialBudgetsPage /> },
        { path: "/savings", element: <SavingsPage /> },
        { path: "/report", element: <ReportPage /> },
        { path: "/user-profile", element: <Profile /> },
        { path: "/recurring-transactions", element: <RecurringTransactions /> },
      ],
    },
    { path: "/*", element: <NotFound /> },
    { path: "/aichatbot", element: <AIChatBot /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Suspense>
    </QueryClientProvider>
  );
}
