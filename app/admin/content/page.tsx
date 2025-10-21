'use client'

import { useState, useEffect } from 'react'
import { Save, Edit2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface ContentItem {
  id: string
  page: string
  section: string
  content_key: string
  content_value: string
  content_type: string
}

export default function ContentManagementPage() {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    fetchContents()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page', { ascending: true })

    if (error) {
      toast.error('Failed to load content')
      console.error(error)
    } else {
      setContents(data || [])
    }
    setLoading(false)
  }

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id)
    setEditValue(item.content_value)
  }

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from('page_content')
      .update({ content_value: editValue })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update content')
      console.error(error)
    } else {
      toast.success('Content updated successfully')
      setEditingId(null)
      fetchContents()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  const groupedContents = contents.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = []
    }
    acc[item.page].push(item)
    return acc
  }, {} as Record<string, ContentItem[]>)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading content...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600 mt-2">Edit website text content and page sections</p>
      </div>

      {Object.entries(groupedContents).map(([page, items]) => (
        <div key={page} className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">{page} Page</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.content_key}</h3>
                      <p className="text-sm text-gray-500">Section: {item.section}</p>
                    </div>
                    {editingId !== item.id && (
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-2 px-3 py-1 text-sm text-[#4ade80] hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </div>

                  {editingId === item.id ? (
                    <div>
                      {item.content_type === 'text' ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent"
                          rows={4}
                        />
                      ) : (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent font-mono text-sm"
                          rows={8}
                        />
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleSave(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#4ade80] text-white rounded-lg hover:bg-[#22c55e] transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-700 bg-gray-50 p-3 rounded">
                      {item.content_value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {Object.keys(groupedContents).length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No content found</p>
          <p className="text-sm text-gray-400">Run the admin_panel_schema.sql to seed initial content</p>
        </div>
      )}
    </div>
  )
}
