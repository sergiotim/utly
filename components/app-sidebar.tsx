import { title } from "process";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { url } from "inspector";
import { QrCode } from "lucide-react";

const items = [
  {
    title: "QR-Code Generator",
    url: "/qrcode",
    icon: QrCode,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <a href="/">
          <span className="text-base font-semibold">Utly</span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                        <item.icon></item.icon>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
