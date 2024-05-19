import Header from "@/components/Header";
import Sidebar from "./Sidebar";
import { cookies } from "next/headers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const collapsed = cookies().get("react-resizable-panels:collapsed")
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined
    return (
        <Sidebar defaultCollapsed={defaultCollapsed}>
            {/* <Header /> */}
            {children}
        </Sidebar>
    );
}