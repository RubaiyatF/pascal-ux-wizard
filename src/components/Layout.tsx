import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNavbar } from "./TopNavbar";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <TopNavbar />
        
        <div className="flex flex-1 pt-16">
          <AppSidebar />
          
          <main className="flex-1 p-4 sm:p-6 md:p-8 transition-all">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;