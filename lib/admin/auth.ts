/**
 * Admin Authentication & Authorization Utilities
 */

import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type UserRole = 'owner' | 'admin' | 'editor' | 'customer'

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: UserRole
}

// Hardcoded admin user ID (your specific user)
const ADMIN_USER_ID = 'f97a9218-57da-49b0-92b5-07be3d18c70e'

/**
 * Check if user is authenticated and has admin/owner role
 */
export async function requireAdmin(): Promise<AdminUser> {
  const supabase = await createSupabaseServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()

  console.log('=== ADMIN AUTH CHECK ===')
  console.log('User authenticated:', !!user)
  console.log('User ID:', user?.id)
  console.log('Expected ID:', ADMIN_USER_ID)
  console.log('Match:', user?.id === ADMIN_USER_ID)

  if (!user) {
    console.log('Redirecting to signin - no user')
    redirect('/auth/signin?redirect=/admin')
  }

  // Check if user is the hardcoded admin
  if (user.id !== ADMIN_USER_ID) {
    console.log('Access denied - User ID does not match')
    console.log('Redirecting to home page')
    redirect('/')
  }

  console.log('Admin access granted!')
  // Return admin user data
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || null,
    role: 'owner'
  }
}

/**
 * Check if user is owner (highest privilege)
 */
export async function requireOwner(): Promise<AdminUser> {
  const user = await requireAdmin()
  // Since we're using hardcoded ID, this user is always owner
  return user
}

/**
 * Check if current user has specific role
 */
export async function hasRole(role: UserRole | UserRole[]): Promise<boolean> {
  try {
    const supabase = await createSupabaseServerComponentClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return false

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData) return false

    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(userData.role as UserRole)
  } catch {
    return false
  }
}

/**
 * Get current admin user or null
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const supabase = await createSupabaseServerComponentClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: userData } = await supabase
      .from('users')
      .select('id, email, name, role')
      .eq('id', user.id)
      .single()

    if (!userData || !['owner', 'admin'].includes(userData.role)) {
      return null
    }

    return userData as AdminUser
  } catch {
    return null
  }
}

/**
 * Log admin activity
 */
export async function logAdminActivity(
  action: string,
  entityType?: string,
  entityId?: string,
  details?: Record<string, any>
) {
  try {
    const supabase = await createSupabaseServerComponentClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from('admin_activity_log').insert({
      user_id: user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details || {},
    })
  } catch (error) {
    console.error('Failed to log admin activity:', error)
  }
}
