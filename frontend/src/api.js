const API_URL = "/api";

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Server error' }));
    throw new Error(error.message || `HTTP Error: ${res.status}`);
  }
  return res.json();
}

// Users
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  return handleResponse(res);
}

export async function createUser(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResponse(res);
}

// Groups
export async function getGroups() {
  const res = await fetch(`${API_URL}/groups`);
  return handleResponse(res);
}

export async function createGroup(group) {
  const res = await fetch(`${API_URL}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });
  return handleResponse(res);
}

// Events
export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  return handleResponse(res);
}

export async function createEvent(groupId, event) {
  const res = await fetch(`${API_URL}/events/group/${groupId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return handleResponse(res);
}