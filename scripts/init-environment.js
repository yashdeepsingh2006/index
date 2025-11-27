#!/usr/bin/env node

/**
 * Environment initialization script
 * Sets up data directory and validates environment variables
 */

const fs = require('fs').promises;
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = require('fs').readFileSync(envPath, 'utf8');
    
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key] = value;
        }
      }
    });
    
    console.log('✅ Loaded environment variables from .env.local');
  } catch (error) {
    console.warn('⚠️  Could not load .env.local file:', error.message);
  }
}

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'provider-settings.json');

const DEFAULT_SETTINGS = {
  activeProvider: 'gemini',
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system'
};

async function ensureDataDirectory() {
  try {
    await fs.access(DATA_DIR);
    console.log('✅ Data directory exists');
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    console.log('✅ Created data directory');
  }
}

async function initializeSettings() {
  try {
    await fs.access(SETTINGS_FILE);
    console.log('✅ Settings file exists');
  } catch {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    console.log('✅ Created default settings file');
  }
}

function validateEnvironmentVariables() {
  const required = ['GEMINI_API_KEY', 'GROQ_API_KEY', 'ADMIN_EMAILS', 'NEXTAUTH_SECRET'];
  const missing = [];

  for (const varName of required) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease check your .env.local file and ensure all required variables are set.');
    console.error('See .env.example for reference.');
    process.exit(1);
  } else {
    console.log('✅ All required environment variables are set');
  }
}

async function main() {
  console.log('🚀 Initializing admin provider toggle environment...\n');

  try {
    // Load environment variables
    loadEnvFile();
    
    // Validate environment variables
    validateEnvironmentVariables();

    // Set up data directory and settings
    await ensureDataDirectory();
    await initializeSettings();

    console.log('\n✅ Environment initialization complete!');
    console.log('\nNext steps:');
    console.log('1. Start your Next.js application');
    console.log('2. Access the admin interface at /direct/admin/provider');
    console.log('3. Configure your preferred AI provider');

  } catch (error) {
    console.error('❌ Initialization failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ensureDataDirectory, initializeSettings, validateEnvironmentVariables };