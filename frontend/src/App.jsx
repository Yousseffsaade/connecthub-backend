import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/api";

function App() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Forms state
  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [groupForm, setGroupForm] = useState({ name: "", description: "" });
  const [eventForm, setEventForm] = useState({ title: "", date: "", groupId: "" });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "users") await loadUsers();
      if (activeTab === "groups") await loadGroups();
      if (activeTab === "events") {
        await loadEvents();
        await loadGroups(); // Pour le dropdown
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to load users");
    setUsers(await res.json());
  }

  async function loadGroups() {
    const res = await fetch(`${API_URL}/groups`);
    if (!res.ok) throw new Error("Failed to load groups");
    setGroups(await res.json());
  }

  async function loadEvents() {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok) throw new Error("Failed to load events");
    setEvents(await res.json());
  }

  async function handleUserSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });
      if (!res.ok) throw new Error("Failed to create user");
      setUserForm({ name: "", email: "" });
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGroupSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupForm),
      });
      if (!res.ok) throw new Error("Failed to create group");
      setGroupForm({ name: "", description: "" });
      await loadGroups();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEventSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_URL}/events/group/${eventForm.groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventForm.title,
          date: eventForm.date,
        }),
      });
      if (!res.ok) throw new Error("Failed to create event");
      setEventForm({ title: "", date: "", groupId: "" });
      await loadEvents();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔗 ConnectHub</h1>
        <p>Manage Users, Groups & Events</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          👤 Users
        </button>
        <button
          className={activeTab === "groups" ? "active" : ""}
          onClick={() => setActiveTab("groups")}
        >
          👥 Groups
        </button>
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          📅 Events
        </button>
      </nav>

      <main className="content">
        {error && <div className="error">❌ {error}</div>}
        {loading && <div className="loading">⏳ Loading...</div>}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="section">
            <h2>Users</h2>
            <form onSubmit={handleUserSubmit} className="form">
              <input
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                required
              />
              <button type="submit">➕ Add User</button>
            </form>

            <div className="list">
              {users.map((user) => (
                <div key={user.id} className="card">
                  <h3>{user.name}</h3>
                  <p>📧 {user.email}</p>
                  <small>ID: {user.id}</small>
                </div>
              ))}
              {users.length === 0 && <p className="empty">No users yet</p>}
            </div>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === "groups" && (
          <div className="section">
            <h2>Groups</h2>
            <form onSubmit={handleGroupSubmit} className="form">
              <input
                type="text"
                placeholder="Group Name"
                value={groupForm.name}
                onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={groupForm.description}
                onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                required
              />
              <button type="submit">➕ Add Group</button>
            </form>

            <div className="list">
              {groups.map((group) => (
                <div key={group.id} className="card">
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                  <small>ID: {group.id}</small>
                </div>
              ))}
              {groups.length === 0 && <p className="empty">No groups yet</p>}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div className="section">
            <h2>Events</h2>
            <form onSubmit={handleEventSubmit} className="form">
              <input
                type="text"
                placeholder="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                required
              />
              <input
                type="datetime-local"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                required
              />
              <select
                value={eventForm.groupId}
                onChange={(e) => setEventForm({ ...eventForm, groupId: e.target.value })}
                required
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <button type="submit">➕ Add Event</button>
            </form>

            <div className="list">
              {events.map((event) => (
                <div key={event.id} className="card">
                  <h3>{event.title}</h3>
                  <p>📅 {new Date(event.date).toLocaleString()}</p>
                  {event.group && (
                    <p className="group-badge">
                      👥 {event.group.name}
                    </p>
                  )}
                  <small>ID: {event.id}</small>
                </div>
              ))}
              {events.length === 0 && <p className="empty">No events yet</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;