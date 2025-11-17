import React from "react";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar></AppSidebar>

          <main>
            <SidebarTrigger></SidebarTrigger>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
