// Utility function to parse MySQL/PHP datetime string to JS Date
export function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  // Handle both 'YYYY-MM-DD HH:mm:ss' and ISO
  let isoStr = dateStr.trim().replace(' ', 'T');
  // If no timezone, add 'Z' for UTC
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(isoStr)) {
    isoStr += 'Z';
  }
  // If missing seconds, add ':00'
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(isoStr)) {
    isoStr += ':00Z';
  }
  const date = new Date(isoStr);
  return isNaN(date.getTime()) ? null : date;
}

export function formatDate(dateStr?: string, options?: Intl.DateTimeFormatOptions): string {
  const date = parseDate(dateStr);
  if (!date) return 'N/A';
  return date.toLocaleDateString(undefined, options);
}

export function formatDateTime(dateStr?: string, options?: Intl.DateTimeFormatOptions): string {
  const date = parseDate(dateStr);
  if (!date) return 'N/A';
  return date.toLocaleString(undefined, options);
}
