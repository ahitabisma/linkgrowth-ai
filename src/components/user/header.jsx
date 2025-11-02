"use client";

import { Linkedin, LogOut, User, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useClickOutside } from "@/hooks/use-click-outside"

export default function Header() {
    const { user, signOut } = useAuth()
    const [profile, setProfile] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const router = useRouter()
    const dropdownRef = useClickOutside(() => setShowDropdown(false))

    const handleLogout = async () => {
        try {
            await signOut()
            router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U'
    }

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfile({
                email: user.email,
                name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
                avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
                provider: user.app_metadata?.provider,
            })
        }
    }, [user])

    return (
        <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
            <div className="px-3 lg:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
                        >
                            {showMobileMenu ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                                <Linkedin className="w-5 h-5 text-slate-900" />
                            </div>
                            <span className="font-bold text-white hidden sm:block">LinkedIn Growth AI</span>
                        </div>
                    </div>

                    {/* Right side - Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                                {profile?.avatar ? (
                                    <Image
                                        src={profile.avatar}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-semibold text-xs">
                                        {getInitials(profile?.name)}
                                    </span>
                                )}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-white font-medium text-sm truncate max-w-32">
                                    {profile?.name}
                                </p>
                                <p className="text-slate-400 text-xs truncate max-w-32">
                                    {profile?.email}
                                </p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                                <div className="p-4 border-b border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                            {profile?.avatar ? (
                                                <Image
                                                    src={profile.avatar}
                                                    alt="Profile"
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-semibold">
                                                    {getInitials(profile?.name)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium truncate">{profile?.name}</p>
                                            <p className="text-slate-400 text-sm truncate">{profile?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition">
                                        <User className="w-4 h-4" />
                                        Profile Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-slate-700 transition"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {showMobileMenu && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
                        {/* Mobile navigation items would go here */}
                    </div>
                </div>
            )}
        </header>
    )
}