import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: Date;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: new Date() });

  const addEvent = () => {
    if (newEvent.title) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: '', date: new Date() });
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Helper function to get the number of days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper function to get the first day of the month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInCurrentMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Generate the grid for days in the current month
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty cells for previous month
  }
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth}><ChevronLeft /></button>
          <h3 className="text-xl font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={nextMonth}><ChevronRight /></button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold">{day}</div>
          ))}
          {calendarDays.map((date, i) => (
            <div key={i} className="border p-2 h-24 overflow-y-auto">
              {date && (
                <>
                  <div className="text-right">{date.getDate()}</div>
                  {events
                    .filter(event => event.date.toDateString() === date.toDateString())
                    .map(event => (
                      <div key={event.id} className="text-sm bg-purple-100 p-1 mb-1 rounded">
                        {event.title}
                      </div>
                    ))
                  }
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <input
            type="date"
            value={newEvent.date.toISOString().split('T')[0]}
            onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <button onClick={addEvent} className="bg-purple-600 text-white px-4 py-2 rounded">
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
