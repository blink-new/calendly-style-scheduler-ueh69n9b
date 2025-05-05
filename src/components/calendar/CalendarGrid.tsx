import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from '../../lib/types';
import { Button } from '../ui/button';
import TimeSlot from './TimeSlot';

interface CalendarGridProps {
  days: CalendarDay[];
}

const CalendarGrid = ({ days }: CalendarGridProps) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = days[selectedDayIndex];

  const handlePrevDay = () => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(selectedDayIndex - 1);
    }
  };

  const handleNextDay = () => {
    if (selectedDayIndex < days.length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Available Time Slots
          </h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrevDay}
              disabled={selectedDayIndex === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextDay}
              disabled={selectedDayIndex === days.length - 1}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="overflow-x-auto">
        <div className="flex p-2 border-b border-gray-200">
          {days.map((day, index) => (
            <button
              key={day.date}
              className={`flex-shrink-0 px-3 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
                index === selectedDayIndex
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              } ${day.isToday ? 'ring-1 ring-primary-400' : ''}`}
              onClick={() => setSelectedDayIndex(index)}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase">{day.dayOfWeek.slice(0, 3)}</span>
                <span className={`text-lg ${day.isToday ? 'font-bold' : ''}`}>
                  {day.dayOfMonth}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Info */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">
          {selectedDay.dayOfWeek}, {selectedDay.month} {selectedDay.dayOfMonth}, {selectedDay.year}
        </h3>
        <p className="text-sm text-gray-600">
          {selectedDay.slots.length === 0 
            ? 'No available slots for this day' 
            : `${selectedDay.slots.filter(slot => slot.isAvailable).length} slots available`}
        </p>
      </div>

      {/* Time Slots Grid */}
      <div className="p-4">
        {selectedDay.slots.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No available time slots for this day.</p>
            <p className="text-sm text-gray-400 mt-2">Please select another day.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedDay.slots.map((slot) => (
              <TimeSlot key={slot.id} slot={slot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;