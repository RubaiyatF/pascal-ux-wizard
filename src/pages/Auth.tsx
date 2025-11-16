import { SignIn, SignUp } from "@clerk/clerk-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { AnimatedLogo } from "@/components/AnimatedLogo";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const mode = searchParams.get("mode") || "sign-in";

  // Get the page user was trying to access before being redirected to login
  const redirectTo = (location.state as { from?: string })?.from || "/onboarding";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full overflow-hidden">
            <AnimatedLogo />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Pascal
          </h1>
          <p className="text-muted-foreground mt-2">
            Customer Success Agent that activates and upsell
          </p>
        </div>

        {/* Clerk Auth Components */}
        <div className="flex justify-center">
          {mode === "sign-up" ? (
            <SignUp
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-elevated border-border/50",
                },
              }}
              routing="virtual"
              signInUrl="/auth?mode=sign-in"
              afterSignUpUrl={redirectTo}
            />
          ) : (
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-elevated border-border/50",
                },
              }}
              routing="virtual"
              signUpUrl="/auth?mode=sign-up"
              afterSignInUrl={redirectTo}
            />
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
