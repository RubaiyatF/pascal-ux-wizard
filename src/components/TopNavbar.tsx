import { useState } from "react";
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
      <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-card border-b border-border z-50 flex items-center px-2 sm:px-4 gap-2 sm:gap-4">
        {/* Logo - Clickable */}
        <button
          onClick={() => navigate('/home')}
          className={`flex items-center gap-2 shrink-0 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
            isHomeActive 
              ? 'bg-[hsl(67,100%,88%)] text-foreground' 
              : 'hover:bg-accent/50'
          }`}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden">
            <AnimatedLogo />
          </div>
          <span className="font-bold text-base sm:text-lg hidden xs:inline">Pascal</span>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Project Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1 sm:gap-2 border-border bg-white text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10 max-w-[120px] sm:max-w-none">
                <span className="truncate">{currentProject}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border z-[60]">
              {projects.map((project) => (
                <DropdownMenuItem 
                  key={project}
                  className={`cursor-pointer ${currentProject === project ? 'bg-accent' : ''}`}
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
              <Avatar className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                  MO
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border z-[60]">
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
