'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, Shield, Trash2 } from 'lucide-react'
import AddAdminModal from './AddAdminModal'

interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
  created_at: string
}

interface ManageAdminsClientProps {
  initialAdmins: AdminUser[]
}

export default function ManageAdminsClient({ initialAdmins }: ManageAdminsClientProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSuccess = () => {
    router.refresh()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Admins</h1>
          <p className="text-gray-600 mt-2">Add or remove admin users (Owner only)</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#4ade80] text-white rounded-lg hover:bg-[#22c55e] transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {/* Admin Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {initialAdmins && initialAdmins.length > 0 ? (
                initialAdmins.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-[#4ade80] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'No name'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'owner'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.role !== 'owner' && (
                        <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">No admin users found</p>
                      <p className="text-sm">Add admin users to help manage the site</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Role Permissions</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Owner:</strong> Full access - can manage admins, edit all content, view all data</li>
          <li><strong>Admin:</strong> Limited access - can edit prices, content, view orders and analytics, but cannot manage other admins</li>
        </ul>
      </div>

      {/* Add Admin Modal */}
      <AddAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
