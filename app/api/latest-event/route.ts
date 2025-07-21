import { NextRequest } from 'next/server';
import { getLatestEvent } from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  try {
    const event = await getLatestEvent();
    return Response.json(event);
  } catch (err) {
    console.error('Failed to fetch latest event', err);
    return new Response('Failed to fetch latest event', { status: 500 });
  }
}
