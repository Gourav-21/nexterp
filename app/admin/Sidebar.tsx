"use client"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel,ResizablePanelGroup } from "@/components/ui/resizable"
import SidebarItem from "./Sidebar-item"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function Sidebar({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup autoSaveId="persistence"  direction="horizontal" className="h-full items-stretch">
                <ResizablePanel
                    defaultSize={15}
                    collapsedSize={4}
                    collapsible={true}
                    minSize={15}
                    maxSize={15}
                    onCollapse={() => setIsCollapsed(true)}
                    onExpand={() => setIsCollapsed(false)}
                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}>

                    <SidebarItem isCollapsed={isCollapsed} />
                </ResizablePanel>
                <ResizableHandle   />
                <ResizablePanel defaultSize={80} >
                    <ScrollArea className="h-full w-full">
                        <div className="h-screen w-full">{ children }</div>
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}