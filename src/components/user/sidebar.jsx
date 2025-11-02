"use client";

import { cn } from "@/lib/utils";
import { Linkedin, Settings, History, BarChart3, MessageSquare } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: BarChart3
    },
    {
        name: 'Profile Analyzer',
        href: '/profile-analyzer',
        icon: Linkedin
    },
    {
        name: 'Post Analyzer',
        href: '/post-analyzer',
        icon: MessageSquare
    },
    {
        name: 'History',
        href: '/history',
        icon: History
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 w-64 h-full pt-20 transition-transform -translate-x-full border-r border-slate-800 bg-slate-900/95 backdrop-blur-sm md:translate-x-0">
            <div className="h-full px-3 pb-4 overflow-y-auto">
                <nav className="space-y-2 mt-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200",
                                    isActive
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}