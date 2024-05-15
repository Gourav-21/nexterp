import Dashboard from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Dashboard>
            {children}
        </Dashboard>
    );
}