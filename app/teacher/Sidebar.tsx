"use client"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Sidebar from "./Sidebar-item"
import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"

export default function Dashboard({children}: {children: ReactNode}) {
    const [isCollapsed, setIsCollapsed] = useState(localStorage.getItem("react-resizable-panels:collapsed")==="true")
    console.log(localStorage.getItem("react-resizable-panels:collapsed"))
    
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
                <ResizablePanel
                    defaultSize={10}
                    collapsedSize={4}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(true)
                        localStorage.setItem("react-resizable-panels:collapsed", "true")
                    }}
                    onExpand={() => {
                        setIsCollapsed(false)
                        localStorage.setItem("react-resizable-panels:collapsed", "false" )
                    }}
                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}>

                    <Sidebar isCollapsed={isCollapsed} />
                </ResizablePanel>

                <ResizableHandle />
                <ResizablePanel defaultSize={80} >
                    <div className="flex flex-col h-full">{children}</div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )

}