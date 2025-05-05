import { CalendarDay, TimeSlot, User } from './types';
import { addDays, format, isToday, startOfDay } from 'date-fns';

// Mock user data
export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  timezone: 'America/New_York',
  workingHours: {
    start: '09:00',
    end: '17:00',
    daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
  },
};

// Generate time slots for a given day
const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const dateStr = format(date, 'yyyy-MM-dd');
  const dayOfWeek = date.getDay();
  
  // Only generate slots for working days
  if (currentUser.workingHours.daysOfWeek.includes(dayOfWeek)) {
    // Generate slots every 30 minutes during working hours
    const [startHour, startMinute] = currentUser.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = currentUser.workingHours.end.split(':').map(Number);
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const nextMinute = (currentMinute + 30) % 60;
      const nextHour = nextMinute === 0 ? currentHour + 1 : currentHour;
      
      if (nextHour <= endHour) {
        const startTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
        const endTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;
        
        // Randomly mark some slots as unavailable
        const isAvailable = Math.random() > 0.3;
        
        slots.push({
          id: `${dateStr}-${startTime}-${endTime}`,
          date: dateStr,
          startTime,
          endTime,
          isAvailable,
          ...(isAvailable ? {} : {
            bookedBy: {
              name: 'Someone Else',
              email: 'someone@example.com',
              purpose: 'Project Discussion',
            },
          }),
        });
      }
      
      currentHour = nextHour;
      currentMinute = nextMinute;
    }
  }
  
  return slots;
};

// Generate calendar days for the next 14 days
export const generateCalendarDays = (): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const today = startOfDay(new Date());
  
  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    days.push({
      date: dateStr,
      dayOfWeek: format(date, 'EEEE'),
      dayOfMonth: date.getDate(),
      month: format(date, 'MMMM'),
      year: date.getFullYear(),
      isToday: isToday(date),
      slots: generateTimeSlots(date),
    });
  }
  
  return days;
};

// Generate calendar data
export const calendarData = generateCalendarDays();