import { useEffect, useState } from "react";
import { getUsers, createUser } from "./api";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createUser({ name, email });
    setName("");
    setEmail("");
    loadUsers();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ConnectHub Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;