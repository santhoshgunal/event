import React, { useState, useEffect } from "react";
import { getEvents } from "./api";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // GET all events from Django
  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Load events once when the app first mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="app-container">
      <h1>🎉 Event Management System</h1>

      <EventForm
        editingEvent={editingEvent}
        onSaved={fetchEvents}
        clearEditing={() => setEditingEvent(null)}
      />

      <EventList events={events} onEdit={setEditingEvent} onDeleted={fetchEvents} />
    </div>
  );
}

export default App;
