import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { calendarData, currentUser } from '../lib/data';
import { BookingFormData, TimeSlot } from '../lib/types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar, Clock, User, Mail, MessageSquare, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    purpose: '',
  });

  // Find the selected time slot
  const selectedSlot = calendarData
    .flatMap(day => day.slots)
    .find(slot => slot.id === id);

  if (!selectedSlot) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Time Slot Not Found</h1>
        <p className="text-gray-600 mb-8">The time slot you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/calendar')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calendar
        </Button>
      </div>
    );
  }

  if (!selectedSlot.isAvailable) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Time Slot Not Available</h1>
        <p className="text-gray-600 mb-8">This time slot has already been booked. Please select another time.</p>
        <Button onClick={() => navigate('/calendar')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calendar
        </Button>
      </div>
    );
  }

  // Format date for display
  const dateObj = parse(selectedSlot.date, 'yyyy-MM-dd', new Date());
  const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      toast.success('Meeting successfully booked!');
    }, 1500);
  };

  if (isBooked) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl text-gray-900">Booking Confirmed!</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Your meeting with {currentUser.name} has been scheduled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{formattedDate}</p>
                  <p className="text-gray-600">{selectedSlot.startTime} - {selectedSlot.endTime}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{formData.name}</p>
                  <p className="text-gray-600">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Meeting Purpose</p>
                  <p className="text-gray-600">{formData.purpose}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/calendar')}>
              Return to Calendar
            </Button>
            <Button>
              Add to My Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/calendar')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Calendar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Book a meeting with {currentUser.name}
            </h1>
            <p className="text-gray-600">
              Please fill out the form to confirm your booking.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Fill out your information to confirm this time slot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Meeting Purpose</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="purpose"
                      name="purpose"
                      placeholder="What would you like to discuss?"
                      className="pl-10 min-h-[100px]"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Selected Time Slot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="font-medium text-gray-900">Date</span>
                </div>
                <p className="text-gray-700">{formattedDate}</p>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="font-medium text-gray-900">Time</span>
                </div>
                <p className="text-gray-700">{selectedSlot.startTime} - {selectedSlot.endTime}</p>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="font-medium text-gray-900">Host</span>
                </div>
                <p className="text-gray-700">{currentUser.name}</p>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;