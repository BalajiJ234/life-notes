import Link from 'next/link'
import { FileText, CheckSquare, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-10 w-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Life Notes</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Capture your thoughts and manage your tasks in one beautiful place.
          Part of the <span className="font-semibold text-blue-600">Life-Sync</span> ecosystem.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Notes Card */}
        <Link
          href="/notes"
          className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-colors">
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Quick notes with colors, tags, reminders, and attachments. 
            Perfect for capturing ideas on the go.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>✓ Color-coded notes</li>
            <li>✓ Tags & categories</li>
            <li>✓ Pin important notes</li>
            <li>✓ Set reminders</li>
          </ul>
          <div className="mt-6 text-blue-600 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
            Open Notes →
          </div>
        </Link>

        {/* Todos Card */}
        <Link
          href="/todos"
          className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Todos</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Task management with priorities, due dates, and calendar view. 
            Stay organized and productive.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>✓ Priority levels</li>
            <li>✓ Due dates & reminders</li>
            <li>✓ Calendar view</li>
            <li>✓ Categories & filters</li>
          </ul>
          <div className="mt-6 text-green-600 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
            Open Todos →
          </div>
        </Link>
      </div>

      {/* Life-Sync Ecosystem */}
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">
          Part of the Life-Sync Personal Operating System
        </p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            💰 Wealth Pulse
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            📝 Life Notes
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
            🤖 Assistant (Coming Soon)
          </span>
        </div>
      </div>
    </div>
  )
}
