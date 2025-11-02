"use client";

import ProtectedRoute from "@/components/protected-route";
import Header from "@/components/user/header";
import Sidebar from "@/components/user/sidebar";

export default function UserLayout({ children }) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 min-w-0 transition-all duration-200 md:ml-64 mt-15">
                        <div className="w-full max-w-none overflow-x-hidden">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}