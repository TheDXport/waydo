'use client';

import { useState } from 'react';

interface CalendarEvent {
  summary?: string;
  description?: string;
  start?: { dateTime?: string; date?: string };
}

export default function Home() {
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/latest-event');
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error('Failed to load event', err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <button
        className="bg-black text-white rounded px-4 py-2"
        onClick={fetchEvent}
        disabled={loading}
      >
        {loading ? 'Loading…' : 'Get Latest Event'}
      </button>
      {event && (
        <div className="border rounded p-4 w-full max-w-md">
          <h2 className="text-xl font-semibold">{event.summary ?? 'No title'}</h2>
          {event.description && <p className="mt-2">{event.description}</p>}
          {(event.start?.dateTime || event.start?.date) && (
            <p className="mt-2 text-sm text-gray-600">
              {new Date(event.start.dateTime ?? event.start.date ?? '').toLocaleString()}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
