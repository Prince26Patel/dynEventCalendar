import React, { useState } from "react";
import { Calendar } from "./ui/calendar";

const CalendarWrapper = ({ onDaySelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDaySelect(date);
  };

  const isSelectedDate = (date) => {
    return date.toDateString() === selectedDate.toDateString(); // Check if the date matches the selected date
  };

  return (
    <div
      className="calendar-wrapper"
      style={{
        textAlign: 'center',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '310px' }}> {/* Set max width for calendar */}
        <h2>CALENDAR</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          dayClassName={(date) =>
            isSelectedDate(date)
              ? 'border-2 border-white bg-blue-500 text-white' 
              : ''
          }
          className="rounded-md border mx-auto w-full" 
        />
      </div>
    </div>
  );
};

export default CalendarWrapper;
