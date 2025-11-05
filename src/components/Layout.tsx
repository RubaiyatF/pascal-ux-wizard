import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, MessageSquare, Target, BarChart3, Settings, Sparkles, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import pascalLogo from "@/assets/pascal-logo.png";
interface LayoutProps {
  children: ReactNode;
}
const navigation = [{
  name: "Home",
  href: "/home",
  icon: Target
}, {
  name: "Email Queue",
  href: "/email-queue",
  icon: Mail
}, {
  name: "Journey",
  href: "/conversations",
  icon: MessageSquare
}, {
  name: "Analytics",
  href: "/analytics",
  icon: BarChart3
}, {
  name: "Settings",
  href: "/settings",
  icon: Settings
}];
const Layout = ({
  children
}: LayoutProps) => {
  const location = useLocation();
  return <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                <img src={pascalLogo} alt="Pascal Logo" className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Pascal</h1>
                <p className="text-xs text-muted-foreground">AI Agent</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map(item => {
            const isActive = location.pathname === item.href;
            return <Link key={item.name} to={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>;
          })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border">
            <div className="p-3 rounded-lg bg-gradient-card border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold">Quick Actions</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Manage your projects from here</p>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.open('https://lovable.dev', '_blank')}>
                  <Plus className="w-3 h-3 mr-2" />
                  Create New Project
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.open('https://lovable.dev/projects', '_blank')}>
                  Switch Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>;
};
export default Layout;