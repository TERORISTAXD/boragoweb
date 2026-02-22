'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Eye, X, AlertTriangle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Submission {
    id: string
    email: string
    subject: string
    message: string
    created_at: string
}

interface Props {
    submissions: Submission[]
    totalCount: number
    page: number
    totalPages: number
}

export default function SubmissionsTable({ submissions, totalCount, page, totalPages }: Props) {
    const router = useRouter()
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!submissionToDelete) return
        setIsDeleting(true)
        try {
            const response = await fetch(`/api/submissions/${submissionToDelete}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete')
            toast.success('Message deleted.', {
                style: { background: '#1A1A1A', color: '#E6E6E6', border: '1px solid #ef4444' },
            })
            // Refresh server-side data by re-navigating
            router.refresh()
        } catch {
            toast.error('Could not delete submission.')
        } finally {
            setIsDeleting(false)
            setIsDeleteModalOpen(false)
            setSubmissionToDelete(null)
            setSelectedSubmission(null)
        }
    }

    return (
        <>
            <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold text-white">Date</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-white">Email</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-white w-full">Subject</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-white text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {submissions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-24 text-center text-gray-400">
                                    No submissions found. Messages from the contact form will appear here.
                                </td>
                            </tr>
                        ) : (
                            submissions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 text-gray-300">
                                        {new Date(sub.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 font-medium">
                                        <a href={`mailto:${sub.email}`} className="hover:text-white transition-colors">{sub.email}</a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 truncate max-w-[200px] sm:max-w-[400px]">
                                        {sub.subject}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setSelectedSubmission(sub)}
                                                className="p-2 rounded-lg bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 hover:text-[#4ade80] transition-colors"
                                                title="View Message"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSubmissionToDelete(sub.id)
                                                    setIsDeleteModalOpen(true)
                                                }}
                                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                title="Delete Message"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between bg-white/[0.02]">
                    <p className="text-sm text-gray-400">
                        Page <span className="font-semibold text-white">{page}</span> of <span className="font-semibold text-white">{totalPages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => router.push(`/portal/submissions?page=${page - 1}`)}
                            disabled={page === 1}
                            className="p-2 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => router.push(`/portal/submissions?page=${page + 1}`)}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/60">
                    <div className="absolute inset-0" onClick={() => setSelectedSubmission(null)} />
                    <div className="relative w-full max-w-2xl bg-[#0a0a0a] ring-1 ring-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                            <h3 className="text-lg font-semibold text-white">Message Details</h3>
                            <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="px-6 py-6 overflow-y-auto flex-1">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">From</label>
                                        <a href={`mailto:${selectedSubmission.email}`} className="text-[#22c55e] hover:text-[#4ade80] transition-colors break-all">
                                            {selectedSubmission.email}
                                        </a>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date Sent</label>
                                        <p className="text-gray-300">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Subject</label>
                                    <p className="text-white font-medium break-words">{selectedSubmission.subject}</p>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Message Body</label>
                                    <div className="bg-white/5 rounded-xl p-5 ring-1 ring-inset ring-white/10 text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                        {selectedSubmission.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex justify-end">
                            <button
                                onClick={() => { setSubmissionToDelete(selectedSubmission.id); setIsDeleteModalOpen(true) }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors ring-1 ring-inset ring-red-500/20"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Message
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-md bg-black/80">
                    <div className="relative w-full max-w-sm bg-[#0a0a0a] ring-1 ring-white/10 rounded-2xl shadow-2xl p-6 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mb-4 ring-1 ring-inset ring-red-500/20">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Delete Submission</h3>
                        <p className="text-sm text-gray-400 mb-6">Are you sure you want to permanently delete this message? This action cannot be undone.</p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => { setIsDeleteModalOpen(false); setSubmissionToDelete(null) }}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-white hover:bg-white/10 transition-colors ring-1 ring-inset ring-white/10 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
