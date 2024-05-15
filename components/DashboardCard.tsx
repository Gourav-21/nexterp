import { LucideIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface KpiProps {
    title: string
    value: string
    Icon: LucideIcon
    percentage?: string
}

export function DashboardCard({ title, value, Icon, percentage }: KpiProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{percentage}</p>
            </CardContent>
        </Card>
    )
}