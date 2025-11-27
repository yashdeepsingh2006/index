import { getServerSession } from "next-auth/next"
import { NextRequest } from "next/server"
import { NextAuthOptions } from "next-auth"

/**
 * Admin authentication and authorization utilities
 */

/**
 * Parse admin emails from environment variable
 * @returns Array of admin email addresses
 */
export function getAdminEmails(): string[] {
  const adminEmails = process.env.ADMIN_EMAILS
  if (!adminEmails) {
    throw new Error('ADMIN_EMAILS environment variable is required but not set')
  }
  
  return adminEmails
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(email => email.length > 0)
}

/**
 * Check if an email is in the admin whitelist
 * @param email - Email address to check
 * @returns True if email is whitelisted as admin
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = getAdminEmails()
  return adminEmails.includes(email.toLowerCase())
}

/**
 * Validate admin session and authorization
 * @param authOptions - NextAuth configuration options
 * @returns Object with session data if valid, error info if invalid
 */
export async function validateAdminSession(authOptions: NextAuthOptions): Promise<
  | { valid: true; session: any; user: any }
  | { valid: false; error: string; status: number }
> {
  try {
    // Get the session from NextAuth
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || !session.user.email) {
      return {
        valid: false,
        error: 'No valid session found',
        status: 401
      } as const
    }

    // Check if user email is in admin whitelist
    if (!isAdminEmail(session.user.email)) {
      return {
        valid: false,
        error: 'Access denied: insufficient privileges',
        status: 403
      } as const
    }

    return {
      valid: true,
      session,
      user: session.user
    } as const
  } catch (error) {
    console.error('Admin session validation error:', error)
    return {
      valid: false,
      error: 'Authentication error',
      status: 500
    } as const
  }
}

/**
 * Create standardized error responses for admin API routes
 */
export function createAdminErrorResponse(message: string, status: number) {
  return new Response(
    JSON.stringify({
      error: message,
      timestamp: new Date().toISOString()
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}