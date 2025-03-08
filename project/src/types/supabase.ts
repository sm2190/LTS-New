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
      scholars: {
        Row: {
          id: string
          name: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          scholar_id: string
          title: string
          icon: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          scholar_id: string
          title: string
          icon?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          scholar_id?: string
          title?: string
          icon?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          title: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          title: string
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          title?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      series: {
        Row: {
          id: string
          category_id: string | null
          subcategory_id: string | null
          title: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          subcategory_id?: string | null
          title: string
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          subcategory_id?: string | null
          title?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      lectures: {
        Row: {
          id: string
          series_id: string
          title: string
          duration: string
          audio_url: string
          description: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          series_id: string
          title: string
          duration: string
          audio_url: string
          description?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          series_id?: string
          title?: string
          duration?: string
          audio_url?: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}