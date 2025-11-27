import { promises as fs } from 'fs';
import * as path from 'path';
import type { ProviderType } from './providers/interface';
import { GeminiProvider } from './providers/gemini';
import { GroqProvider } from './providers/groq';
import type { AIProvider } from './providers/interface';

/**
 * Interface for provider settings stored in JSON
 */
export interface ProviderSettings {
  activeProvider: ProviderType;
  lastUpdated: string;
  updatedBy: string;
}

/**
 * Default settings used when no configuration file exists
 */
const DEFAULT_SETTINGS: ProviderSettings = {
  activeProvider: 'gemini',
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system'
};

/**
 * Service class for managing provider settings with JSON file storage
 * Provides atomic operations and error handling for settings persistence
 */
export class SettingsService {
  private static readonly SETTINGS_DIR = 'data';
  private static readonly SETTINGS_FILE = 'provider-settings.json';
  private static readonly BACKUP_FILE = 'provider-settings.backup.json';

  /**
   * Get the full path to the settings file
   */
  private static getSettingsPath(): string {
    return path.join(process.cwd(), this.SETTINGS_DIR, this.SETTINGS_FILE);
  }

  /**
   * Get the full path to the backup settings file
   */
  private static getBackupPath(): string {
    return path.join(process.cwd(), this.SETTINGS_DIR, this.BACKUP_FILE);
  }

  /**
   * Ensure the data directory exists
   */
  private static async ensureDataDirectory(): Promise<void> {
    const dataDir = path.join(process.cwd(), this.SETTINGS_DIR);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  /**
   * Validate provider settings object
   */
  private static validateSettings(settings: any): settings is ProviderSettings {
    return (
      settings &&
      typeof settings === 'object' &&
      typeof settings.activeProvider === 'string' &&
      (settings.activeProvider === 'gemini' || settings.activeProvider === 'groq') &&
      typeof settings.lastUpdated === 'string' &&
      typeof settings.updatedBy === 'string'
    );
  }

  /**
   * Load provider settings from JSON file
   * Returns default settings if file doesn't exist or is invalid
   */
  static async loadSettings(): Promise<ProviderSettings> {
    try {
      await this.ensureDataDirectory();
      const settingsPath = this.getSettingsPath();
      
      try {
        const fileContent = await fs.readFile(settingsPath, 'utf-8');
        const parsedSettings = JSON.parse(fileContent);
        
        if (this.validateSettings(parsedSettings)) {
          return parsedSettings;
        } else {
          console.warn('Invalid settings format, using defaults');
          return DEFAULT_SETTINGS;
        }
      } catch (error) {
        // File doesn't exist or is corrupted, return defaults
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          console.info('Settings file not found, using defaults');
        } else {
          console.warn('Error reading settings file, using defaults:', error);
        }
        return DEFAULT_SETTINGS;
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Save provider settings to JSON file with atomic operations
   * Creates a backup before writing to prevent data loss
   */
  static async saveSettings(settings: ProviderSettings): Promise<void> {
    if (!this.validateSettings(settings)) {
      throw new Error('Invalid settings object provided');
    }

    try {
      await this.ensureDataDirectory();
      const settingsPath = this.getSettingsPath();
      const backupPath = this.getBackupPath();
      const settingsJson = JSON.stringify(settings, null, 2);

      // Create backup of existing settings if file exists
      try {
        await fs.access(settingsPath);
        await fs.copyFile(settingsPath, backupPath);
      } catch {
        // File doesn't exist, no backup needed
      }

      // Write new settings atomically by writing to temp file first
      const tempPath = settingsPath + '.tmp';
      await fs.writeFile(tempPath, settingsJson, 'utf-8');
      await fs.rename(tempPath, settingsPath);

      console.info('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error(`Failed to save settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Initialize settings with default values if no settings file exists
   * This is useful for first-time setup
   */
  static async initializeSettings(): Promise<ProviderSettings> {
    const currentSettings = await this.loadSettings();
    
    // If we got default settings (file didn't exist), save them to create the file
    if (currentSettings.updatedBy === 'system' && currentSettings.activeProvider === 'gemini') {
      try {
        await this.saveSettings(currentSettings);
        console.info('Initialized default settings file');
      } catch (error) {
        console.warn('Could not initialize settings file:', error);
      }
    }
    
    return currentSettings;
  }
}

/**
 * Get the active AI provider instance based on current settings
 * Loads settings and returns the appropriate provider with error handling
 */
export async function getActiveProvider(): Promise<AIProvider> {
  try {
    const settings = await SettingsService.loadSettings();
    
    switch (settings.activeProvider) {
      case 'gemini':
        try {
          return new GeminiProvider();
        } catch (error) {
          console.error('Failed to initialize Gemini provider:', error);
          throw new Error(`Gemini provider initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        
      case 'groq':
        try {
          return new GroqProvider();
        } catch (error) {
          console.error('Failed to initialize Groq provider:', error);
          throw new Error(`Groq provider initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        
      default:
        // This should never happen due to validation, but provides a fallback
        console.error(`Invalid provider type: ${settings.activeProvider}`);
        throw new Error(`Unsupported provider type: ${settings.activeProvider}`);
    }
  } catch (error) {
    // If we can't load settings or initialize provider, log error and rethrow
    console.error('Error getting active provider:', error);
    
    // If it's already our custom error, rethrow it
    if (error instanceof Error && error.message.includes('provider initialization failed')) {
      throw error;
    }
    
    // For other errors (like settings loading), provide a more generic message
    throw new Error('Failed to load active AI provider. Please check configuration and try again.');
  }
}

/**
 * Get the current provider type without instantiating the provider
 * Useful for UI display and configuration management
 */
export async function getCurrentProviderType(): Promise<ProviderType> {
  try {
    const settings = await SettingsService.loadSettings();
    return settings.activeProvider;
  } catch (error) {
    console.error('Error getting current provider type:', error);
    // Return default provider type if we can't load settings
    return 'gemini';
  }
}