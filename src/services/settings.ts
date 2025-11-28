import { promises as fs } from 'fs';
import * as path from 'path';
import type { ProviderType } from './providers/interface';
import { GeminiProvider } from './providers/gemini';
import { GroqProvider } from './providers/groq';
import type { AIProvider } from './providers/interface';
import clientPromise from '../lib/mongodb';

/**
 * Interface for provider settings stored in database
 */
export interface ProviderSettings {
  activeProvider: ProviderType;
  lastUpdated: string;
  updatedBy: string;
}

/**
 * Interface for MongoDB document
 */
interface ProviderSettingsDocument {
  _id: string;
  activeProvider: ProviderType;
  lastUpdated: string;
  updatedBy: string;
}

/**
 * Default settings used when no configuration exists
 */
const DEFAULT_SETTINGS: ProviderSettings = {
  activeProvider: 'gemini',
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system'
};

/**
 * Service class for managing provider settings with MongoDB storage
 * Falls back to file system in development if MongoDB is not available
 */
export class SettingsService {
  private static readonly SETTINGS_DIR = 'data';
  private static readonly SETTINGS_FILE = 'provider-settings.json';
  private static readonly COLLECTION_NAME = 'provider_settings';
  private static readonly DOCUMENT_ID = 'active_provider_config';

  /**
   * Check if MongoDB is available
   */
  private static async isMongoAvailable(): Promise<boolean> {
    try {
      if (!process.env.MONGODB_URI) {
        return false;
      }
      const client = await clientPromise;
      if (!client) {
        return false;
      }
      // Test the connection
      await client.db().admin().ping();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Load settings from MongoDB
   */
  private static async loadFromMongo(): Promise<ProviderSettings | null> {
    try {
      const client = await clientPromise;
      if (!client) {
        return null;
      }
      
      const db = client.db();
      const collection = db.collection<ProviderSettingsDocument>(this.COLLECTION_NAME);
      
      const document = await collection.findOne({ _id: this.DOCUMENT_ID });
      
      if (document && this.validateSettings(document)) {
        return {
          activeProvider: document.activeProvider,
          lastUpdated: document.lastUpdated,
          updatedBy: document.updatedBy
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error loading settings from MongoDB:', error);
      return null;
    }
  }

  /**
   * Save settings to MongoDB
   */
  private static async saveToMongo(settings: ProviderSettings): Promise<void> {
    try {
      const client = await clientPromise;
      if (!client) {
        throw new Error('MongoDB client not available');
      }
      
      const db = client.db();
      const collection = db.collection<ProviderSettingsDocument>(this.COLLECTION_NAME);
      
      await collection.replaceOne(
        { _id: this.DOCUMENT_ID },
        {
          activeProvider: settings.activeProvider,
          lastUpdated: settings.lastUpdated,
          updatedBy: settings.updatedBy
        },
        { upsert: true }
      );
      
      console.info('Settings saved to MongoDB successfully');
    } catch (error) {
      console.error('Error saving settings to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Get the full path to the settings file (fallback)
   */
  private static getSettingsPath(): string {
    return path.join(process.cwd(), this.SETTINGS_DIR, this.SETTINGS_FILE);
  }

  /**
   * Ensure the data directory exists (fallback)
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
   * Load settings from file system (fallback)
   */
  private static async loadFromFile(): Promise<ProviderSettings | null> {
    try {
      await this.ensureDataDirectory();
      const settingsPath = this.getSettingsPath();
      
      const fileContent = await fs.readFile(settingsPath, 'utf-8');
      const parsedSettings = JSON.parse(fileContent);
      
      if (this.validateSettings(parsedSettings)) {
        return parsedSettings;
      }
      
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Save settings to file system (fallback)
   */
  private static async saveToFile(settings: ProviderSettings): Promise<void> {
    try {
      await this.ensureDataDirectory();
      const settingsPath = this.getSettingsPath();
      const settingsJson = JSON.stringify(settings, null, 2);
      
      await fs.writeFile(settingsPath, settingsJson, 'utf-8');
      console.info('Settings saved to file successfully');
    } catch (error) {
      console.error('Error saving settings to file:', error);
      throw error;
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
   * Load provider settings from MongoDB or fallback to file system
   * Returns default settings if no storage is available
   */
  static async loadSettings(): Promise<ProviderSettings> {
    try {
      // Try MongoDB first
      if (await this.isMongoAvailable()) {
        const mongoSettings = await this.loadFromMongo();
        if (mongoSettings) {
          return mongoSettings;
        }
      }
      
      // Fallback to file system
      const fileSettings = await this.loadFromFile();
      if (fileSettings) {
        return fileSettings;
      }
      
      // Return defaults if nothing found
      console.info('No settings found, using defaults');
      return DEFAULT_SETTINGS;
      
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Save provider settings to MongoDB or fallback to file system
   */
  static async saveSettings(settings: ProviderSettings): Promise<void> {
    if (!this.validateSettings(settings)) {
      throw new Error('Invalid settings object provided');
    }

    try {
      // Try MongoDB first
      if (await this.isMongoAvailable()) {
        await this.saveToMongo(settings);
        return;
      }
      
      // Fallback to file system
      await this.saveToFile(settings);
      
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error(`Failed to save settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Initialize settings with default values if no settings exist
   */
  static async initializeSettings(): Promise<ProviderSettings> {
    const currentSettings = await this.loadSettings();
    
    // If we got default settings (nothing exists), save them
    if (currentSettings.updatedBy === 'system' && currentSettings.activeProvider === 'gemini') {
      try {
        await this.saveSettings(currentSettings);
        console.info('Initialized default settings');
      } catch (error) {
        console.warn('Could not initialize settings:', error);
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