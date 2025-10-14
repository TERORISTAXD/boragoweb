/**
 * Cart Migration Utility
 * 
 * Migrates old string-based product IDs to UUID-based IDs
 * Run this once to update existing carts in localStorage
 */

export const ID_MIGRATION_MAP: Record<string, string> = {
  'tier-consultation': '00000000-0000-0000-0000-000000000001',
  'tier-enterprise': '00000000-0000-0000-0000-000000000002',
  'tier-static': '00000000-0000-0000-0000-000000000003',
}

export function migrateCartIds(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const cartData = localStorage.getItem('cart')
    
    if (!cartData) {
      return false
    }

    const items = JSON.parse(cartData)
    
    if (!Array.isArray(items)) {
      return false
    }

    let migrated = false
    const updatedItems = items.map((item: any) => {
      if (typeof item.id === 'string' && ID_MIGRATION_MAP[item.id]) {
        migrated = true
        return {
          ...item,
          id: ID_MIGRATION_MAP[item.id],
        }
      }
      return item
    })

    if (migrated) {
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      console.log('✅ Cart IDs migrated successfully')
      return true
    }

    return false
  } catch (error) {
    console.error('Failed to migrate cart IDs:', error)
    return false
  }
}

/**
 * Check if cart needs migration
 */
export function needsCartMigration(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const cartData = localStorage.getItem('cart')
    
    if (!cartData) {
      return false
    }

    const items = JSON.parse(cartData)
    
    if (!Array.isArray(items)) {
      return false
    }

    return items.some((item: any) => 
      typeof item.id === 'string' && ID_MIGRATION_MAP[item.id]
    )
  } catch (error) {
    return false
  }
}
