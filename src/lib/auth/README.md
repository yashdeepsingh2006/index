# Admin Authentication

This module provides authentication and authorization utilities for admin-only features.

## Environment Variables

### ADMIN_EMAILS
A comma-separated list of email addresses that have admin privileges.

```bash
ADMIN_EMAILS="admin1@company.com,admin2@company.com,admin3@company.com"
```

**Important Notes:**
- Email addresses are case-insensitive
- Whitespace around emails is automatically trimmed
- Empty emails are filtered out
- If not set, no users will have admin access

## Usage

### Admin API Routes
The admin authentication is automatically handled in admin API routes:

```typescript
import { validateAdminSession, createAdminErrorResponse } from '@/lib/auth/admin'

export async function GET(request: NextRequest) {
  const authResult = await validateAdminSession(authOptions)
  
  if (!authResult.valid) {
    return createAdminErrorResponse(authResult.error, authResult.status)
  }
  
  // Admin-only logic here
}
```

### Manual Email Checking
You can also check if an email is an admin email:

```typescript
import { isAdminEmail } from '@/lib/auth/admin'

if (isAdminEmail('user@example.com')) {
  // User is an admin
}
```

## Security

- Uses NextAuth session validation
- Requires valid Google OAuth session
- Email whitelist stored in environment variables
- No admin information exposed to client-side code