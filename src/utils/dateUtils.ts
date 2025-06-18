export function parseDate(dateInput: string): string | null {
  // Handle common date formats

  const input = dateInput.trim().toLowerCase();

  // Today
  if (/^(today|tod)$/i.test(input)) {
    return new Date().toISOString().split('T')[0];
  }

  // Tomorrow
  if (/^(tomorrow|tom)$/i.test(input)) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  // Relative days (e.g., "3", "3d", "in 3 days")
  const daysMatch =
    input.match(/^(\d+)d?$/) || input.match(/^in\s*(\d+)\s*days?$/);
  if (daysMatch) {
    const days = parseInt(daysMatch[1], 10);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toISOString().split('T')[0];
  }

  // Try to parse as date
  try {
    const date = new Date(dateInput);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch {
    // Invalid date
  }

  return null;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Reset time parts for comparison
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const tomorrowOnly = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate()
  );

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Today';
  }

  if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return 'Tomorrow';
  }

  // Check if within a week
  const diffTime = dateOnly.getTime() - todayOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0 && diffDays <= 7) {
    return `In ${diffDays} day${diffDays === 1 ? '' : 's'}`;
  }

  if (diffDays < 0 && diffDays >= -7) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
  }

  // Default format
  return date.toLocaleDateString();
}

export function isOverdue(dateString: string): boolean {
  const dueDate = new Date(dateString);
  const today = new Date();

  // Reset time parts for comparison
  const dueDateOnly = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return dueDateOnly.getTime() < todayOnly.getTime();
}

export function getDaysUntilDue(dateString: string): number {
  const dueDate = new Date(dateString);
  const today = new Date();

  // Reset time parts for comparison
  const dueDateOnly = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffTime = dueDateOnly.getTime() - todayOnly.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
