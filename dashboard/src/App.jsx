import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import LoadingSpinner from "@/components/LoadingSpinner";

import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import { RedirectAuthenticatedUser } from "@/layouts/RedirectAuthenticatedUser";

import PublicLayout from "@/layouts/PublicLayout";
import { useAuthStore } from "@/store/authStore";
import { ThemeProvider } from "@/providers/ThemeProvider";

import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import EmailVerificationPage from "@/pages/EmailVerificationPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import ApiKeyPage from "@/pages/ApiKeyPage";
import AccountPage from "@/pages/AccountPage";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {/* <Route index element={
              <h1>no landing page yet so login is default for now</h1>} /> 
          */}
          <Route
            index
            path="login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="verify-email" element={<EmailVerificationPage />} />
          <Route
            path="forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="keys" element={<ApiKeyPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
