import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession, createAdminErrorResponse } from '@/lib/auth/admin'
import { SettingsService } from '@/services/settings'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"

// NextAuth configuration (reused from auth route)
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/direct/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id as string
      return session
    },
  },
}

/**
 * GET /api/admin/provider
 * Returns the current active provider configuration
 * Requires admin authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Validate admin session and authorization
    const authResult = await validateAdminSession(authOptions)
    
    if (!authResult.valid) {
      return createAdminErrorResponse(authResult.error, authResult.status)
    }

    // Load current provider settings
    const settings = await SettingsService.loadSettings()
    
    return NextResponse.json({
      activeProvider: settings.activeProvider,
      lastUpdated: settings.lastUpdated,
      updatedBy: settings.updatedBy
    })
    
  } catch (error) {
    console.error('Error in GET /api/admin/provider:', error)
    return createAdminErrorResponse(
      'Internal server error while retrieving provider settings',
      500
    )
  }
}

/**
 * POST /api/admin/provider
 * Updates the active provider configuration
 * Requires admin authentication and valid provider type
 */
export async function POST(request: NextRequest) {
  try {
    // Validate admin session and authorization
    const authResult = await validateAdminSession(authOptions)
    
    if (!authResult.valid) {
      return createAdminErrorResponse(authResult.error, authResult.status)
    }

    // Parse and validate request body
    let requestBody
    try {
      requestBody = await request.json()
    } catch (error) {
      return createAdminErrorResponse('Invalid JSON in request body', 400)
    }

    const { provider } = requestBody

    // Validate provider type
    if (!provider || typeof provider !== 'string') {
      return createAdminErrorResponse('Provider field is required and must be a string', 400)
    }

    if (provider !== 'gemini' && provider !== 'groq') {
      return createAdminErrorResponse(
        'Invalid provider type. Must be either "gemini" or "groq"',
        400
      )
    }

    // Create new settings object
    const newSettings = {
      activeProvider: provider as 'gemini' | 'groq',
      lastUpdated: new Date().toISOString(),
      updatedBy: authResult.user?.email || 'unknown'
    }

    // Save the new settings
    await SettingsService.saveSettings(newSettings)
    
    return NextResponse.json({
      success: true,
      activeProvider: newSettings.activeProvider,
      message: `Provider successfully updated to ${provider}`
    })
    
  } catch (error) {
    console.error('Error in POST /api/admin/provider:', error)
    
    // Check if it's a settings save error
    if (error instanceof Error && error.message.includes('Failed to save settings')) {
      return createAdminErrorResponse(
        'Failed to save provider settings. Please try again.',
        500
      )
    }
    
    return createAdminErrorResponse(
      'Internal server error while updating provider settings',
      500
    )
  }
}