import { Target, Mail, Route, BarChart3, Settings, ChevronLeft } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", url: "/home", icon: Target },
  { title: "Email Queue", url: "/email-queue", icon: Mail },
  { title: "Journey", url: "/conversations", icon: Route },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-border bg-card transition-all",
        isCollapsed ? "w-14" : "w-48"
      )}
    >
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-1 p-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                          <span className="text-sm font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="p-2 border-t border-border">
          {!isCollapsed && (
            <div className="px-3 py-2 text-xs text-muted-foreground">
              v0.1.0
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "w-full",
              isCollapsed ? "h-10" : "h-8 justify-start gap-2"
            )}
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
            {!isCollapsed && (
              <span className="text-sm text-muted-foreground">Collapse</span>
            )}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
