import { NextRequest, NextResponse } from 'next/server';
import { MonitoringService } from '@/services/monitoring';

export async function GET() {
  try {
    const stats = await MonitoringService.getStats(24); // Last 24 hours
    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Monitoring API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitoring data' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await MonitoringService.cleanup(30); // Keep 30 days
    return NextResponse.json({ success: true, message: 'Cleanup completed' });
  } catch (error) {
    console.error('Monitoring Cleanup Error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup monitoring data' },
      { status: 500 }
    );
  }
}