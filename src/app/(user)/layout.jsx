"use client";

import ProtectedRoute from "@/components/protected-route";

export default function AuthLayout({ children }) {
    return <>
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    </>;
}