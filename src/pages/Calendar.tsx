import { useState } from 'react';
import { calendarData, currentUser } from '../lib/data';
import CalendarGrid from '../components/calendar/CalendarGrid';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Clock, Calendar as CalendarIcon, Globe, User } from 'lucide-react';

const Calendar = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-3/4">
          <Tabs defaultValue="calendar" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Scheduling Page</h1>
              <TabsList>
                <TabsTrigger value="calendar" className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="calendar" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Your Booking Calendar</h2>
                  <p className="text-gray-600">Share your availability and let others book time with you.</p>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Share Calendar Link
                </Button>
              </div>
              
              <CalendarGrid days={calendarData} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={currentUser.name}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={currentUser.email}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Timezone</label>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{currentUser.timezone}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Working Hours</label>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{currentUser.workingHours.start} - {currentUser.workingHours.end}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4">Update Profile</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>
                Your scheduling activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Upcoming Meetings</p>
                  <p className="text-2xl font-bold text-primary-700">3</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {calendarData.reduce((total, day) => 
                      total + day.slots.filter(slot => slot.isAvailable).length, 0
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Booked Slots</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {calendarData.reduce((total, day) => 
                      total + day.slots.filter(slot => !slot.isAvailable).length, 0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;