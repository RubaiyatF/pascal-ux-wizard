import { Search, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import pascalLogo from "@/assets/pascal-logo.png";

export const TopNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <img src={pascalLogo} alt="Pascal" className="w-6 h-6" />
        </div>
        <span className="font-bold text-lg">Pascal</span>
      </div>

      {/* Project Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 text-muted-foreground">
            Pascal Demo
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Pascal Demo</DropdownMenuItem>
          <DropdownMenuItem>Create New Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-muted/50 border-border"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>

        {/* User Avatar */}
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            MO
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
