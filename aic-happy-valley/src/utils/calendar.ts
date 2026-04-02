/**
 * Utility to generate calendar links and files for AIC Happy Valley events.
 */

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string
  endDate?: string;  // ISO string
}

/**
 * Generates a Google Calendar link
 */
export const generateGoogleCalendarLink = (event: CalendarEvent): string => {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, '');
  // Default to 1 hour if no end date
  const end = event.endDate 
    ? new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, '')
    : new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');

  const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
  const params = new URLSearchParams({
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `${baseUrl}&${params.toString()}`;
};

/**
 * Downloads a universal .ics file for Outlook, iCal, etc.
 */
export const downloadIcsFile = (event: CalendarEvent) => {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, '');
  const end = event.endDate 
    ? new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, '')
    : new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
