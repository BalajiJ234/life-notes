'use client'

import { useState } from 'react'
import { X, Upload, FileText, AlertCircle } from 'lucide-react'

interface BulkImportProps {
  feature: 'notes' | 'todos'
  onImport: (data: unknown[]) => void
  onClose: () => void
}

export default function BulkImport({ feature, onImport, onClose }: BulkImportProps) {
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleImport = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        setError('Input must be a JSON array')
        return
      }
      onImport(data)
      setError(null)
    } catch {
      setError('Invalid JSON format. Please check your input.')
    }
  }

  const exampleData = feature === 'notes'
    ? JSON.stringify([
        {
          id: '1',
          title: 'Example Note',
          content: 'This is an example note content',
          color: 'blue',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPinned: false,
          isEncrypted: false
        }
      ], null, 2)
    : JSON.stringify([
        {
          id: '1',
          text: 'Example Todo',
          completed: false,
          priority: 'medium',
          category: 'Personal',
          createdAt: new Date().toISOString()
        }
      ], null, 2)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Bulk Import {feature === 'notes' ? 'Notes' : 'Todos'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">How to import:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Paste a JSON array of {feature}</li>
                  <li>Each item should have the required fields</li>
                  <li>Click Import to add them</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* JSON Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON Data
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={`Paste your JSON array here...\n\nExample:\n${exampleData}`}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Example */}
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
              View example format
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded-lg overflow-x-auto text-xs">
              {exampleData}
            </pre>
          </details>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!jsonInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Import {feature === 'notes' ? 'Notes' : 'Todos'}
          </button>
        </div>
      </div>
    </div>
  )
}
