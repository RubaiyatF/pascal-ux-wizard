import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CreateProjectModal } from "./CreateProjectModal";
import { AnimatedLogo } from "./AnimatedLogo";
import { useProject } from "@/contexts/ProjectContext";

export const TopNavbar = () => {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const { currentProject, setCurrentProject, projects, setProjects } = useProject();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const isHomeActive = location.pathname === '/home' || location.pathname === '/';

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://app.cal.com"});
      Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/auth");
  };

  const handleProjectCreated = (projectName: string) => {
    // Add the new project to the list
    setProjects([...projects, projectName]);
    // Set it as the current project
    setCurrentProject(projectName);
    // Navigate to home for onboarding
    navigate("/home");
  };

  const handleProjectSwitch = (projectName: string) => {
    setCurrentProject(projectName);
    // Navigate to home for new projects, email-queue for Pascal Demo
    if (projectName === "Pascal Demo") {
      navigate("/email-queue");
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center px-4 gap-4">
        {/* Logo - Clickable */}
        <button
          onClick={() => navigate('/home')}
          className={`group flex items-center gap-2 shrink-0 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-secondary/20 ${
            isHomeActive 
              ? 'bg-secondary text-secondary-foreground' 
              : ''
          }`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <AnimatedLogo />
          </div>
          <span className="font-bold text-lg transition-all duration-200 group-hover:font-extrabold">Pascal</span>
        </button>

        {/* Banner */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm text-muted-foreground">
            Request access for Pascal,{" "}
            <button
              data-cal-link="pascal-vdhnsv/30min"
              data-cal-namespace="30min"
              data-cal-config='{"layout":"month_view"}'
              className="text-primary hover:underline font-medium"
            >
              Book a Demo
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Project Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border bg-card">
                {currentProject}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border-border z-50">
              {projects.map((project) => (
                <DropdownMenuItem 
                  key={project}
                  className={`cursor-pointer ${currentProject === project ? 'bg-secondary text-secondary-foreground' : ''}`}
                  onClick={() => handleProjectSwitch(project)}
                >
                  {project}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setIsCreateProjectOpen(true)}
              >
                Create New Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  MO
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border-border z-50">
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CreateProjectModal 
        open={isCreateProjectOpen} 
        onOpenChange={setIsCreateProjectOpen}
        onSuccess={handleProjectCreated}
      />
    </>
  );
};
