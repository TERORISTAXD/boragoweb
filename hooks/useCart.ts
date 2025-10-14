import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price_cents: number
  quantity: number
  image?: string
  slug: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

// Migration map for old string IDs to actual database UUIDs
const ID_MIGRATION_MAP: Record<string, string> = {
  'tier-consultation': '550e8400-e29b-41d4-a716-446655440001',
  'tier-enterprise': '550e8400-e29b-41d4-a716-446655440002', // Store
  'tier-static': '550e8400-e29b-41d4-a716-446655440003', // Static website
}

// Migrate cart items from old IDs to new UUIDs
function migrateCartItems(items: CartItem[]): CartItem[] {
  return items.map((item) => {
    if (ID_MIGRATION_MAP[item.id]) {
      return { ...item, id: ID_MIGRATION_MAP[item.id] }
    }
    return item
  })
}

export const useCart = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price_cents * item.quantity,
          0
        )
      },
    }),
    {
      name: 'borago-cart',
      storage: createJSONStorage(() => localStorage),
      // Migrate old cart items on hydration
      onRehydrateStorage: () => (state) => {
        if (state && state.items.length > 0) {
          const migratedItems = migrateCartItems(state.items)
          const needsMigration = migratedItems.some((item, index) => 
            item.id !== state.items[index].id
          )
          
          if (needsMigration) {
            state.items = migratedItems
            console.log('✅ Cart migrated to use UUID product IDs')
          }
        }
      },
    }
  )
)
