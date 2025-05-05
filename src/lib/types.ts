export interface TimeSlot {
  id: string;
  date: string; // ISO date string
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  isAvailable: boolean;
  bookedBy?: {
    name: string;
    email: string;
    purpose?: string;
  };
}

export interface CalendarDay {
  date: string; // ISO date string
  dayOfWeek: string; // Monday, Tuesday, etc.
  dayOfMonth: number;
  month: string; // January, February, etc.
  year: number;
  isToday: boolean;
  slots: TimeSlot[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  timezone: string;
  workingHours: {
    start: string; // Format: "HH:MM"
    end: string; // Format: "HH:MM"
    daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
  };
}

export interface BookingFormData {
  name: string;
  email: string;
  purpose: string;
}