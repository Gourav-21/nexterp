import { Separator } from "@/components/ui/separator"
import { Nav } from "../../components/Nav"
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    Send,
    ShoppingCart,
    Trash2,
    Triangle,
    Users2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MailProps {
    isCollapsed?: boolean
}

export default function Sidebar({ isCollapsed  }: MailProps) {
    return (
        <>
            <div className={cn(
                "flex h-[52px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2"
            )}>
                <div className="border-b p-2 ">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <Triangle className="size-5 fill-foreground" />
                    </Button>
                </div>
                {isCollapsed? "":
                <div className="flex-1">
                 Admin 
                </div>
                }
            </div>
            <Separator />
            <Nav
                isCollapsed={isCollapsed? true : false}
                links={[
                    {
                        title: "Inbox",
                        label: "128",
                        icon: Inbox,
                        variant: "default",
                    },
                    {
                        title: "Drafts",
                        label: "9",
                        icon: File,
                        variant: "ghost",
                    },
                    {
                        title: "Sent",
                        label: "",
                        icon: Send,
                        variant: "ghost",
                    },
                    {
                        title: "Junk",
                        label: "23",
                        icon: ArchiveX,
                        variant: "ghost",
                    },
                    {
                        title: "Trash",
                        label: "",
                        icon: Trash2,
                        variant: "ghost",
                    },
                    {
                        title: "Archive",
                        label: "",
                        icon: Archive,
                        variant: "ghost",
                    },
                ]}
            />
            <Separator />
            <Nav
                isCollapsed={isCollapsed? true : false}
                links={[
                    {
                        title: "Social",
                        label: "972",
                        icon: Users2,
                        variant: "ghost",
                    },
                    {
                        title: "Updates",
                        label: "342",
                        icon: AlertCircle,
                        variant: "ghost",
                    },
                    {
                        title: "Forums",
                        label: "128",
                        icon: MessagesSquare,
                        variant: "ghost",
                    },
                    {
                        title: "Shopping",
                        label: "8",
                        icon: ShoppingCart,
                        variant: "ghost",
                    },
                    {
                        title: "Promotions",
                        label: "21",
                        icon: Archive,
                        variant: "ghost",
                    },
                ]}
            />
        </ >
    )
}
