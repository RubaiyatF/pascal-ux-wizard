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
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all">
            <div className="h-full w-full max-w-6xl mx-auto rounded-3xl border border-border bg-card/60 shadow-elevated">
              <div className="h-full w-full p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </div>
          </main>
        </div>
        
        <SupportChat />
      </div>
    </SidebarProvider>
  );
};

export default Layout;