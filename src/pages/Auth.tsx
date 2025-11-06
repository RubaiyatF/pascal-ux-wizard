import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AnimatedLogo } from "@/components/AnimatedLogo";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication with Lovable Cloud
    console.log(isLogin ? "Login" : "Sign up", {
      email,
      password,
      name
    });
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <AnimatedLogo />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">Pascal</h1>
          <p className="text-muted-foreground mt-2">Customer Success Agent that activates and upsell</p>
        </div>

        {/* Auth Card */}
        <Card className="p-6 shadow-elevated border-border/50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {isLogin ? "Welcome back" : "Get started"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Sign in to your account to continue" : "Create your account to unlock AI insights"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required={!isLogin} />
              </div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90 transition-opacity">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>;
};
export default Auth;