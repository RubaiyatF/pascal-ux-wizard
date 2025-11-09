import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env file");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={CLERK_PUBLISHABLE_KEY}
    appearance={{
      baseTheme: undefined,
    }}
    signInUrl="/auth"
    signUpUrl="/auth"
    afterSignInUrl="/home"
    afterSignUpUrl="/onboarding"
    signInFallbackRedirectUrl="/home"
    signUpFallbackRedirectUrl="/onboarding"
  >
    <App />
  </ClerkProvider>
);
