import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 *
 * Ensures user is authenticated before accessing protected pages.
 * If not authenticated, redirects to /auth with the intended destination saved.
 * After login, user will be redirected back to the original page they tried to access.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  // Wait for Clerk to load authentication state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not signed in, redirect to auth page and save the intended destination
  if (!isSignedIn) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};
