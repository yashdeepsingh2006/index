/**
 * Environment variable validation utilities
 * Validates required environment variables for the admin provider toggle system
 */

interface EnvironmentConfig {
  // AI Provider API Keys
  GEMINI_API_KEY: string;
  GROQ_API_KEY: string;
  
  // Admin Configuration
  ADMIN_EMAILS: string;
  NEXTAUTH_SECRET: string;
  
  // Optional with defaults
  DEFAULT_AI_PROVIDER?: string;
}

/**
 * Validate that all required environment variables are present
 * @throws Error if any required environment variables are missing
 */
export function validateEnvironmentVariables(): EnvironmentConfig {
  const errors: string[] = [];
  
  // Required environment variables
  const requiredVars = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  };
  
  // Check for missing required variables
  Object.entries(requiredVars).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      errors.push(`${key} environment variable is required but not set`);
    }
  });
  
  // Validate ADMIN_EMAILS format
  if (requiredVars.ADMIN_EMAILS) {
    const emails = requiredVars.ADMIN_EMAILS.split(',').map(e => e.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    emails.forEach(email => {
      if (!emailRegex.test(email)) {
        errors.push(`Invalid email format in ADMIN_EMAILS: ${email}`);
      }
    });
  }
  
  // Validate DEFAULT_AI_PROVIDER if set
  const defaultProvider = process.env.DEFAULT_AI_PROVIDER;
  if (defaultProvider && !['gemini', 'groq'].includes(defaultProvider)) {
    errors.push(`DEFAULT_AI_PROVIDER must be 'gemini' or 'groq', got: ${defaultProvider}`);
  }
  
  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:\n${errors.map(e => `  - ${e}`).join('\n')}\n\n` +
      `Please check your .env.local file and ensure all required variables are set.\n` +
      `See .env.example for reference.`
    );
  }
  
  return {
    GEMINI_API_KEY: requiredVars.GEMINI_API_KEY!,
    GROQ_API_KEY: requiredVars.GROQ_API_KEY!,
    ADMIN_EMAILS: requiredVars.ADMIN_EMAILS!,
    NEXTAUTH_SECRET: requiredVars.NEXTAUTH_SECRET!,
    DEFAULT_AI_PROVIDER: defaultProvider || 'gemini',
  };
}

/**
 * Get validated environment configuration
 * Caches the result after first validation
 */
let cachedConfig: EnvironmentConfig | null = null;

export function getEnvironmentConfig(): EnvironmentConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnvironmentVariables();
  }
  return cachedConfig;
}

/**
 * Validate environment variables and log results
 * Use this during application startup
 */
export function validateAndLogEnvironment(): void {
  try {
    const config = validateEnvironmentVariables();
    console.log('✅ Environment validation passed');
    console.log(`   - Default AI Provider: ${config.DEFAULT_AI_PROVIDER}`);
    console.log(`   - Admin emails configured: ${config.ADMIN_EMAILS.split(',').length}`);
  } catch (error) {
    console.error('❌ Environment validation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}