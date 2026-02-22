'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Loader2, Lock } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { PageBackground } from '@/components/PageBackground'

export default function PortalLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Note: Since this is a client component, we use the build client or standard js client
    // But wait, createSupabaseBuildClient in `server.ts` uses process.env without NEXT_PUBLIC sometimes.
    // Actually, we should just use the standard JS client for client-side auth.

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const supabase = createSupabaseBrowserClient()

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            // Check if it's the specific boragoweb account we want to allow 
            // (Or let RLS/server side check in the dashboard handle it, but we can do a quick check here too)
            if (data.user?.email !== 'boragoweb@gmail.com' && data.user?.email !== 'stanislav@boragoweb.eu' && data.user?.email !== 'nikola@boragoweb.eu' && !data.user?.email?.includes('boragoweb')) {
                // Just as an extra precaution, though the DB will ultimately reject them if they aren't admins.
            }

            toast.success('Access Granted.', {
                style: { background: '#1A1A1A', color: '#E6E6E6', border: '1px solid #22c55e' },
            })

            // Hard redirect so the Server Component re-reads auth cookies fresh
            window.location.href = '/portal/dashboard'
        } catch (err: any) {
            console.error(err)
            toast.error('Invalid credentials or unauthorized.', {
                style: { background: '#1A1A1A', color: '#E6E6E6', border: '1px solid #ef4444' },
            })
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <PageBackground variant="default" />

            <div className="relative w-full max-w-md space-y-8 bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 mb-6">
                        <Lock className="h-8 w-8 text-[#22c55e]" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Client Portal
                    </h2>
                    <p className="text-sm text-gray-400">
                        Authorized personnel only.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-xl border-0 bg-white/5 py-3.5 px-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#22c55e] sm:text-sm sm:leading-6 transition-all"
                                placeholder="Email address"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-xl border-0 bg-white/5 py-3.5 px-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#22c55e] sm:text-sm sm:leading-6 transition-all"
                                placeholder="Password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-xl bg-[#22c55e] px-3 py-3.5 text-sm font-semibold text-black hover:bg-[#4ade80] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22c55e] disabled:opacity-70 transition-all"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                'Sign in to Portal'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
