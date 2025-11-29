import { NextRequest, NextResponse } from 'next/server';
import { FeatureFlagsService } from '@/services/featureFlags';

export async function GET() {
  try {
    const flags = await FeatureFlagsService.getFlags();
    return NextResponse.json({ flags });
  } catch (error) {
    console.error('Feature Flags API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature flags' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { flag, value } = await request.json();
    
    if (!flag || typeof value !== 'boolean') {
      return NextResponse.json(
        { error: 'Flag name and boolean value are required' },
        { status: 400 }
      );
    }

    await FeatureFlagsService.updateFlag(flag, value);
    
    return NextResponse.json({ 
      success: true, 
      message: `Feature flag '${flag}' updated to ${value}` 
    });
  } catch (error) {
    console.error('Feature Flags Update Error:', error);
    return NextResponse.json(
      { error: 'Failed to update feature flag' },
      { status: 500 }
    );
  }
}