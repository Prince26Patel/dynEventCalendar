import React, { useState } from "react";
import CalendarWrapper from "./components/CalendarWrapper";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import dayjs from "dayjs";

const App = () => {
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle selecting a day on the calendar
  const handleDaySelect = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDay(formattedDate);
    setIsModalOpen(true);
  };

  const checkForOverlap = (newEvent, existingEvents) => {
    const newStart = dayjs(`${selectedDay}T${newEvent.start}`);
    const newEnd = dayjs(`${selectedDay}T${newEvent.end}`);

    return existingEvents.some((event) => {
      const existingStart = dayjs(`${selectedDay}T${event.start}`);
      const existingEnd = dayjs(`${selectedDay}T${event.end}`);
      return newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart);
    });
  };

  const handleSaveEvent = (newEvent) => {
    const formattedDate = selectedDay;

    if (events[formattedDate] && checkForOverlap(newEvent, events[formattedDate])) {
      alert("This event overlaps with an existing event. Please adjust the time.");
      return;
    }

    setEvents((prevEvents) => ({
      ...prevEvents,
      [formattedDate]: [...(prevEvents[formattedDate] || []), newEvent],
    }));
    setIsModalOpen(false);
  };

  const handleEditEvent = (index, updatedEvent) => {
    const formattedDate = selectedDay;
    const filteredEvents = events[formattedDate].filter((_, i) => i !== index);

    if (checkForOverlap(updatedEvent, filteredEvents)) {
      alert("This event overlaps with an existing event. Please adjust the time.");
      return;
    }

    setEvents((prevEvents) => ({
      ...prevEvents,
      [formattedDate]: prevEvents[formattedDate].map((event, i) =>
        i === index ? updatedEvent : event
      ),
    }));
  };

  const handleDeleteEvent = (index) => {
    const formattedDate = selectedDay;
    setEvents((prevEvents) => ({
      ...prevEvents,
      [formattedDate]: prevEvents[formattedDate].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="App">
      <div className="content-container">
        {/* Calendar for selecting days */}
        <div className="calendar-container">
          <CalendarWrapper onDaySelect={handleDaySelect} />
        </div>

        <div className="separation-line" />

        {/* Event List for the selected day */}
        <div className="event-container">
          {selectedDay && (
            <EventList
              events={events[selectedDay] || []}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              selectedDay={selectedDay}
            />
          )}
        </div>
      </div>

      {/* Event Modal for adding or editing events */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default App;
