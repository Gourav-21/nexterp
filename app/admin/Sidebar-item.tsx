import { Separator } from "@/components/ui/separator"
import { Nav } from "../../components/Nav"
import { AlertCircle, BadgeHelp, BookMarked, File, GraduationCap, LayoutDashboard, MessagesSquare, Presentation, SquareUserRound, Triangle, UserRoundCheck, Users2, } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface MailProps {
    isCollapsed?: boolean
}

export default function SidebarItem({ isCollapsed }: MailProps) {
    const pathname = usePathname()
    return (
        <div className="h-full flex flex-col">
            <div className={cn(
                "flex h-[52px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2"
            )}>
                <div className="border-b p-2 ">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <Triangle className="size-5 fill-foreground" />
                    </Button>
                </div>
                {isCollapsed ? "" :
                    <div className="flex-1">
                        Admin
                    </div>
                }
            </div>
            <Separator />
            <Nav
                segment={pathname}
                isCollapsed={isCollapsed ? true : false}
                links={[
                    {
                        title: "dashboard",
                        label: "",
                        icon: LayoutDashboard,
                        href: "/admin",
                    },
                    {
                        title: "Students",
                        label: "972",
                        icon: GraduationCap,
                        href: "/admin/students",
                    },
                    {
                        title: "Teachers",
                        label: "972",
                        icon: Users2,
                        href: "/admin/teachers",
                    },
                    {
                        title: "Subjects",
                        label: "",
                        icon: BookMarked,
                        href: "/admin/subjects",
                    },
                    {
                        title: "Class",
                        label: "23",
                        icon: Presentation,
                        href: "/admin/class",

                    },
                    {
                        title: "Attendance",
                        label: "",
                        icon: UserRoundCheck,
                        href: "/admin/attendance",
                    },
                ]}
            />
            <Separator />
            <Nav
                segment={pathname}
                isCollapsed={isCollapsed ? true : false}
                links={[
                    {
                        title: "Notice",
                        label: "9",
                        icon: File,
                    },
                    {
                        title: "Updates",
                        label: "342",
                        icon: AlertCircle,
                    },
                    {
                        title: "Chat",
                        label: "128",
                        icon: MessagesSquare,
                        href: "/admin/chat",
                    },
                ]}
            />
            <Separator />
            <div className="flex-1"></div>
            <Nav
                segment={pathname}
                isCollapsed={isCollapsed ? true : false}
                links={[
                    {
                        title: "Help",
                        label: "342",
                        icon: BadgeHelp,
                    },
                    {
                        title: "Account",
                        label: "128",
                        icon: SquareUserRound,
                    },
                ]}
            />
        </div >
    )
}
