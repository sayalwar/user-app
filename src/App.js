import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [checkDisabled, setCheckDisabled] = useState(false);

  const BASE_URL = 'https://firstuserdataintake.up.railway.app';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      setMessage('User added successfully!');
      setName('');
      setEmail('');

      // Hide success message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } else {
      setMessage('Failed to add user.');

      // Hide error message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleCheckData = async () => {
    // Prompt for credentials
    const userId = prompt("Enter ID:");
    const password = prompt("Enter Password:");

    // Check credentials
    if (userId !== 'NILESH' || password !== 'NILESH') {
      alert("Invalid ID or Password!");
      return;
    }

    setCheckDisabled(true); // Disable button

    try {
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();
      setUserList(data);

      // Hide user list and re-enable button after 5 seconds
      setTimeout(() => {
        setUserList([]);
        setCheckDisabled(false);
      }, 5000);
    } catch (error) {
      alert("Failed to fetch user data.");
      setCheckDisabled(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Left Container - Form */}
      <div className="form-container">
        <h2>User Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>

      {/* Right Container - Check & Display Data */}
      <div className="data-container">
        <button
          onClick={handleCheckData}
          className="submit-button"
          disabled={checkDisabled}
        >
          {checkDisabled ? "Please wait..." : "Check All Data"}
        </button>

        {userList.length > 0 && (
          <div className="user-list">
            <h3>All Users</h3>
            <ul>
              {userList.map((user, index) => (
                <li key={index}>{user.name} - {user.email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
