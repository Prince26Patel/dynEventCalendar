import React, { useState } from "react";
import { Button } from "./ui/button";
import dayjs from "dayjs"; // Import dayjs to format the date

const EventList = ({ events, onEdit, onDelete, selectedDay }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [filter, setFilter] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedEvent({ ...events[index] });
  };

  const handleSave = () => {
    onEdit(editingIndex, editedEvent);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(filter.toLowerCase()) ||
      event.description.toLowerCase().includes(filter.toLowerCase())
  );

  // Format the selected date to display at the top of the event list
  const formattedDate = dayjs(selectedDay).format("YYYY-MM-DD");

  return (
    <div className="event-list bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">Events for {formattedDate}</h3>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {filteredEvents.length > 0 ? (
        <ul className="space-y-4">
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className="p-5 bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200"
              style={{
                backgroundColor:
                  event.category === "work"
                    ? "#1e3a8a"
                    : event.category === "personal"
                    ? "#6b21a8"
                    : "#9333ea",
              }}
            >
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editedEvent.name}
                    onChange={handleChange}
                    className="mb-4 p-3 w-full rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Name"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      name="start"
                      value={editedEvent.start}
                      onChange={handleChange}
                      className="mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="time"
                      name="end"
                      value={editedEvent.end}
                      onChange={handleChange}
                      className="mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <textarea
                    name="description"
                    value={editedEvent.description}
                    onChange={handleChange}
                    className="mb-4 p-3 w-full h-32 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Description"
                  />
                  <div className="flex justify-between">
                    <Button onClick={handleSave} className="mr-2 bg-white text-black hover:bg-gray-200">
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingIndex(null)}
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold">{event.name} ({event.category})</h4>
                  <p className="text-sm text-gray-300">{event.start} - {event.end}</p>
                  <p className="mt-2 text-gray-400 whitespace-normal break-words">{event.description}</p>
                  <div className="mt-4 flex justify-between">
                    <Button onClick={() => handleEditClick(index)} className="mr-2 bg-white text-black hover:bg-gray-200">
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onDelete(index)}
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-center text-gray-400">No events match your search.</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
