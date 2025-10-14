export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'admin' | 'editor' | 'customer'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role?: 'admin' | 'editor' | 'customer'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'admin' | 'editor' | 'customer'
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string | null
          body: string | null
          tags: string[] | null
          cover_image: string | null
          gallery: Json | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary?: string | null
          body?: string | null
          tags?: string[] | null
          cover_image?: string | null
          gallery?: Json | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string | null
          body?: string | null
          tags?: string[] | null
          cover_image?: string | null
          gallery?: Json | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          price_cents: number
          currency: string
          stock: number
          sku: string | null
          images: Json | null
          metadata: Json | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          price_cents: number
          currency?: string
          stock?: number
          sku?: string | null
          images?: Json | null
          metadata?: Json | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          price_cents?: number
          currency?: string
          stock?: number
          sku?: string | null
          images?: Json | null
          metadata?: Json | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: 'pending' | 'paid' | 'fulfilled' | 'cancelled'
          total_cents: number
          currency: string
          stripe_payment_id: string | null
          shipping_info: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'fulfilled' | 'cancelled'
          total_cents: number
          currency?: string
          stripe_payment_id?: string | null
          shipping_info?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'fulfilled' | 'cancelled'
          total_cents?: number
          currency?: string
          stripe_payment_id?: string | null
          shipping_info?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          unit_price_cents: number
          qty: number
          total_cents: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          unit_price_cents: number
          qty: number
          total_cents: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          unit_price_cents?: number
          qty?: number
          total_cents?: number
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          author: string
          role: string | null
          quote: string
          photo_path: string | null
          visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          author: string
          role?: string | null
          quote: string
          photo_path?: string | null
          visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          author?: string
          role?: string | null
          quote?: string
          photo_path?: string | null
          visible?: boolean
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          body: string | null
          tags: string[] | null
          published_at: string | null
          draft: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          body?: string | null
          tags?: string[] | null
          published_at?: string | null
          draft?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          body?: string | null
          tags?: string[] | null
          published_at?: string | null
          draft?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
