import axios from "axios";

// Base URL of the Django backend
const BASE_URL = "http://127.0.0.1:8000/api";

// GET all events
export const getEvents = () => axios.get(`${BASE_URL}/events/`);

// GET a single event by id (used to pre-fill the edit form)
export const getEvent = (id) => axios.get(`${BASE_URL}/events/${id}/`);

// POST - create a new event
export const addEvent = (eventData) => axios.post(`${BASE_URL}/events/add/`, eventData);

// POST - update an existing event
export const updateEvent = (id, eventData) =>
  axios.post(`${BASE_URL}/events/update/${id}/`, eventData);

// POST - delete an event
export const deleteEvent = (id) => axios.post(`${BASE_URL}/events/delete/${id}/`);
