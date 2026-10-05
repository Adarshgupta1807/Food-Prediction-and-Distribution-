import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ greeting, subtitle, children }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar greeting={greeting} subtitle={subtitle} />
                <main className="flex-1 px-8 pb-8 pt-4 space-y-6">{children}</main>
            </div>
        </div>
    );
}
