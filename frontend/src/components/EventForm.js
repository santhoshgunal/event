import React, { useState, useEffect } from "react";
import { addEvent, updateEvent } from "../api";

// editingEvent = null  -> form is in "add" mode
// editingEvent = {...} -> form is in "update" mode
function EventForm({ editingEvent, onSaved, clearEditing }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  // Whenever the user clicks "Edit" on an event, load its data into the form
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        location: editingEvent.location,
        date: editingEvent.date,
        time: editingEvent.time,
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", location: "", date: "", time: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        // POST to the update route
        await updateEvent(editingEvent.id, formData);
        clearEditing();
      } else {
        // POST to the add route
        await addEvent(formData);
      }
      resetForm();
      onSaved(); // tell the parent to refresh the list
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Something went wrong. Check the console for details.");
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{editingEvent ? "Update Event" : "Add New Event"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <input type="time" name="time" value={formData.time} onChange={handleChange} required />

      <div className="form-buttons">
        <button type="submit">{editingEvent ? "Update" : "Add"}</button>
        {editingEvent && (
          <button type="button" onClick={() => { clearEditing(); resetForm(); }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;
