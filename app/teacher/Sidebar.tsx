"use client"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import SidebarItem from "./Sidebar-item"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { setSidebar } from "@/app/actions/setSidebar"

export default function Sidebar({ children, defaultCollapsed = false }: { children: ReactNode, defaultCollapsed: boolean }) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  var c = 0;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 788) {
        setIsCollapsed(true);
      } else {
        if (defaultCollapsed == false){
          console.log("this ran")
          setIsCollapsed(false);
        }
        // c++;
        // console.log(c)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
        <ResizablePanel
          defaultSize={isCollapsed ? 4 : 15}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={15}
          onCollapse={() => {
            setIsCollapsed(true)
            setSidebar(true)
          }}
          onExpand={() => {
            setIsCollapsed(false)
            setSidebar(false)
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out"
          )}>

          <SidebarItem isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80} >
          <ScrollArea className="h-screen w-full">
            <div className="h-full w-full">{children}</div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}