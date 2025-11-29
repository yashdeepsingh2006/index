import { SettingsService } from './settings';

export interface FeatureFlags {
  useInsights: boolean;
  useChat: boolean;
  useExtraction: boolean;
  useCache: boolean;
  useRateLimit: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  useInsights: true,
  useChat: true,
  useExtraction: true,
  useCache: true,
  useRateLimit: true
};

export class FeatureFlagsService {
  static async getFlags(): Promise<FeatureFlags> {
    try {
      const settings = await SettingsService.loadSettings();
      return { ...DEFAULT_FLAGS, ...settings.featureFlags };
    } catch (error) {
      console.error('[FEATURE_FLAGS] Error loading flags:', error);
      return DEFAULT_FLAGS;
    }
  }

  static async updateFlag(flag: keyof FeatureFlags, value: boolean): Promise<void> {
    try {
      const settings = await SettingsService.loadSettings();
      settings.featureFlags = { ...settings.featureFlags, [flag]: value };
      await SettingsService.saveSettings(settings);
      console.log(`[FEATURE_FLAGS] Updated ${flag} to ${value}`);
    } catch (error) {
      console.error('[FEATURE_FLAGS] Error updating flag:', error);
      throw error;
    }
  }

  static async isEnabled(flag: keyof FeatureFlags): Promise<boolean> {
    const flags = await this.getFlags();
    return flags[flag];
  }
}