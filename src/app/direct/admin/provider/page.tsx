"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Loading from '../../../components/Loading'

// Types for API responses
interface ProviderSettings {
  activeProvider: 'gemini' | 'groq'
  lastUpdated: string
  updatedBy: string
}

interface UpdateProviderResponse {
  success: boolean
  activeProvider: 'gemini' | 'groq'
  message?: string
}

export default function ProviderAdminPage(): React.JSX.Element {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State management
  const [currentSettings, setCurrentSettings] = useState<ProviderSettings | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'groq'>('gemini')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  // Load current provider settings
  const loadProviderSettings = async () => {
    try {
      setError(null)
      const response = await fetch('/api/admin/provider', {
        method: 'GET',
        credentials: 'include'
      })

      if (response.status === 401) {
        router.push('/direct/auth/login')
        return
      }

      if (response.status === 403) {
        setIsAuthorized(false)
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to load provider settings')
      }

      const settings: ProviderSettings = await response.json()
      setCurrentSettings(settings)
      setSelectedProvider(settings.activeProvider)
      setIsAuthorized(true)
    } catch (err) {
      console.error('Error loading provider settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to load provider settings')
    } finally {
      setIsLoading(false)
    }
  }

  // Save provider settings
  const saveProviderSettings = async () => {
    if (!selectedProvider || isSaving) return

    try {
      setIsSaving(true)
      setError(null)
      setSuccessMessage(null)

      const response = await fetch('/api/admin/provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          provider: selectedProvider
        })
      })

      if (response.status === 401) {
        router.push('/direct/auth/login')
        return
      }

      if (response.status === 403) {
        setIsAuthorized(false)
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update provider settings')
      }

      const result: UpdateProviderResponse = await response.json()
      
      if (result.success) {
        setSuccessMessage(result.message || 'Provider updated successfully')
        // Reload settings to get updated timestamp and user info
        await loadProviderSettings()
      } else {
        throw new Error('Update failed')
      }
    } catch (err) {
      console.error('Error saving provider settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to save provider settings')
    } finally {
      setIsSaving(false)
    }
  }

  // Load settings on component mount and when session changes
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/direct/auth/login')
      return
    }

    loadProviderSettings()
  }, [session, status, router])

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Show loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loading />
      </div>
    )
  }

  // Show access denied if not authorized
  if (isAuthorized === false) {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <Header title="Admin - Provider Management" />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
            <p className="text-red-700 mb-4">
              You don't have permission to access the admin panel. Please contact your administrator.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to login if no session
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loading />
      </div>
    )
  }

  const hasChanges = currentSettings && selectedProvider !== currentSettings.activeProvider

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header title="Admin - Provider Management" />
      
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Provider Management</h1>
          <p className="text-gray-600">
            Configure which AI provider the application uses for generating insights and chat responses.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-600 mr-2">⚠️</div>
              <div className="text-red-800 font-medium">Error</div>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-600 mr-2">✅</div>
              <div className="text-green-800 font-medium">Success</div>
            </div>
            <p className="text-green-700 mt-1">{successMessage}</p>
          </div>
        )}

        {/* Current Status */}
        {currentSettings && (
          <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Provider
                </label>
                <div className="text-lg font-semibold text-blue-600 capitalize">
                  {currentSettings.activeProvider}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated
                </label>
                <div className="text-sm text-gray-600">
                  {new Date(currentSettings.lastUpdated).toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Updated By
                </label>
                <div className="text-sm text-gray-600">
                  {currentSettings.updatedBy}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Provider Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Provider</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select AI Provider
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as 'gemini' | 'groq')}
              disabled={isSaving}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="gemini">Google Gemini</option>
              <option value="groq">Groq</option>
            </select>
          </div>

          {/* Provider Information */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">
              {selectedProvider === 'gemini' ? 'Google Gemini' : 'Groq'}
            </h3>
            <p className="text-sm text-blue-800">
              {selectedProvider === 'gemini' 
                ? 'Google\'s advanced AI model with strong reasoning capabilities and multimodal support.'
                : 'High-performance AI inference with fast response times and efficient processing.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={saveProviderSettings}
              disabled={!hasChanges || isSaving}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedProvider(currentSettings?.activeProvider || 'gemini')}
              disabled={!hasChanges || isSaving}
              className="px-6 py-2.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          {hasChanges && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-yellow-600 mr-2">⚠️</div>
                <p className="text-sm text-yellow-800">
                  You have unsaved changes. Click "Save Changes" to apply the new provider selection.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Important Notes</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Changes take effect immediately and apply to all new AI requests
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Users will not see any indication of which provider is being used
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Provider settings are persistent across application restarts
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Only administrators can access this configuration panel
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}