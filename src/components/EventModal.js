import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import dayjs from "dayjs";

const EventModal = ({ isOpen, onClose, onSave, selectedDay }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");  // New state for category

  useEffect(() => {
    if (isOpen) {
      // Reset fields when the modal is opened
      setEventName("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setCategory("work");  // Reset category to 'work' by default
    }
  }, [isOpen]);

  const handleSave = () => {
    // Validate that all fields are filled out
    if (!eventName.trim()) {
      alert("Event name is required.");
      return;
    }

    if (!startTime || !endTime) {
      alert("Start time and end time are required.");
      return;
    }

    // Ensure startTime is earlier than endTime
    const start = dayjs(startTime, "HH:mm");
    const end = dayjs(endTime, "HH:mm");

    if (start.isAfter(end) || start.isSame(end)) {
      alert("Start time must be earlier than end time.");
      return;
    }

    // If all validations pass, save the event with the category
    onSave({
      name: eventName.trim(),
      start: startTime,
      end: endTime,
      description,
      category,  // Pass the category to the event
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <h3>Add/Edit Event for {selectedDay}</h3>
        </DialogHeader>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="bg-gray-700 text-black"  // Text input color set to black
          />
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-gray-700 text-black"  // Text input color set to black
          />
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-gray-700 text-black"  // Text input color set to black
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 text-black"  // Text input color set to black
          />
          
          {/* Dropdown for category selection */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 p-2 bg-gray-700 text-white rounded-md w-full"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="others">Others</option>
          </select>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-black text-white border-black hover:bg-white hover:text-black transition-colors"  // Black cancel button
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
