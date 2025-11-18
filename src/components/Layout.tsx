import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNavbar } from "./TopNavbar";
import { AppSidebar } from "./AppSidebar";
import { SupportChat } from "./SupportChat";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <TopNavbar />
        
        <div className="flex flex-1 pt-16">
          <AppSidebar />
          
          <main className="flex-1 p-8 transition-all">
            <div className="h-full border border-border rounded-3xl p-8">
              {children}
            </div>
          </main>
        </div>
        
        <SupportChat />
      </div>
    </SidebarProvider>
  );
};

export default Layout;