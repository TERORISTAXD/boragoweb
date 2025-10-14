'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { X, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

interface AddAdminModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddAdminModal({ isOpen, onClose, onSuccess }: AddAdminModalProps) {
  const supabase = createSupabaseBrowserClient()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Step 1: Checking if user exists:', email)
      console.log('Supabase client:', supabase)
      
      // Check if user already exists with timeout
      const queryPromise = supabase
        .from('users')
        .select('id, email, role')
        .eq('email', email)
        .limit(1)

      console.log('Step 1.5: Query started...')
      
      const { data: users, error: checkError } = await Promise.race([
        queryPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Query timeout after 5 seconds')), 5000)
        )
      ]) as any

      console.log('Step 2: Check result:', { users, checkError })

      if (checkError) {
        console.error('Check error:', checkError)
        throw checkError
      }

      const existingUser = users && users.length > 0 ? users[0] : null

      if (existingUser) {
        console.log('Step 3: User exists, updating role')
        
        // User exists, just update their role
        if (existingUser.role === 'owner') {
          throw new Error('This user is already an owner.')
        }
        if (existingUser.role === 'admin') {
          throw new Error('This user is already an admin.')
        }

        const { error: updateError } = await supabase
          .from('users')
          .update({ role: 'admin' })
          .eq('id', existingUser.id)

        console.log('Step 4: Update result:', { updateError })
        
        if (updateError) throw updateError
      } else {
        console.log('Step 3: User does not exist, creating new account')
        
        // User doesn't exist, create new account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              role: 'admin' // Set role in metadata
            }
          }
        })

        console.log('Step 4: SignUp result:', { signUpData, signUpError })

        if (signUpError) throw signUpError
        if (!signUpData.user) throw new Error('Failed to create user')

        console.log('Step 5: User created successfully')
      }

      console.log('Success! Admin process completed')
      toast.success('Admin added successfully! They need to verify email and login once.')
      setEmail('')
      setPassword('')
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error adding admin:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to add admin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              User Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password * (only for new users)
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <p className="text-sm text-gray-500 mt-2">
              If user exists, password is ignored. If new user, account will be created with this password.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#4ade80] text-white rounded-lg hover:bg-[#22c55e] transition-colors disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? 'Adding...' : 'Add Admin'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
