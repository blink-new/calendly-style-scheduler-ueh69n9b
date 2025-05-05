import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Check, X } from 'lucide-react';
import { TimeSlot as TimeSlotType } from '../../lib/types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';

interface TimeSlotProps {
  slot: TimeSlotType;
}

const TimeSlot = ({ slot }: TimeSlotProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleBooking = () => {
    if (slot.isAvailable) {
      navigate(`/booking/${slot.id}`);
    } else {
      toast.error('This time slot is already booked');
    }
  };

  return (
    <Card 
      className={`border transition-all duration-200 ${
        slot.isAvailable 
          ? 'border-primary-200 hover:border-primary-400 hover:shadow-md' 
          : 'border-gray-200 bg-gray-50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Clock className={`h-4 w-4 mr-2 ${slot.isAvailable ? 'text-primary-500' : 'text-gray-400'}`} />
            <span className={`text-sm font-medium ${slot.isAvailable ? 'text-gray-700' : 'text-gray-500'}`}>
              {slot.startTime} - {slot.endTime}
            </span>
          </div>
          {slot.isAvailable ? (
            <span className="flex items-center text-xs text-green-600 font-medium">
              <Check className="h-3 w-3 mr-1" />
              Available
            </span>
          ) : (
            <span className="flex items-center text-xs text-gray-500 font-medium">
              <X className="h-3 w-3 mr-1" />
              Booked
            </span>
          )}
        </div>
        
        {slot.isAvailable ? (
          <Button 
            size="sm" 
            className={`w-full mt-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
            onClick={handleBooking}
          >
            Book This Slot
          </Button>
        ) : (
          <div className="mt-2 text-xs text-gray-500">
            <p>Booked by: {slot.bookedBy?.name}</p>
            <p className="truncate">{slot.bookedBy?.purpose}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSlot;