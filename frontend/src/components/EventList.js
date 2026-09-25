import React from "react";
import { deleteEvent } from "../api";

function EventList({ events, onEdit, onDeleted }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await deleteEvent(id); // POST to the delete route
      onDeleted(); // tell the parent to refresh the list
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  if (events.length === 0) {
    return <p>No events yet. Add one above!</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <div className="event-card" key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            📍 {event.location} &nbsp;|&nbsp; 📅 {event.date} &nbsp;|&nbsp; ⏰ {event.time}
          </p>
          <div className="card-buttons">
            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventList;
