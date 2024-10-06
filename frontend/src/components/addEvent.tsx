import React, { useState } from 'react';

interface Event {
  title: string;
  date: string;
}

interface AddEventProps {
  onAddEvent: (event: Event) => void;
}

const AddEvent: React.FC<AddEventProps> = ({ onAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({ title: eventTitle, date: eventDate });
    setEventTitle('');
    setEventDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;