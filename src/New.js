import React, { useState } from "react";

const PostObjectArray = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    hobbies: [],
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [submittedUsers, setSubmittedUsers] = useState([]); // Stores submitted users

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addHobby = () => {
    if (hobbyInput !== "") {
      console.log(hobbyInput.trim()  + "   hobbies");
      setUser({ ...user, hobbies: [...user.hobbies, hobbyInput] });
      setHobbyInput("");
    }
  };

  const handlePost = () => {
    setSubmittedUsers([...submittedUsers, user]); // Store user locally
    // Clear form
    setUser({ name: "", age: "", hobbies: [] });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post Object with Array (Local Storage Only)</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={user.name}
        onChange={handleChange}
      />
      <br />

      <input
        type="number"
        name="age"
        placeholder="Enter Age"
        value={user.age}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        placeholder="Enter Hobby"
        value={hobbyInput}
        onChange={(e) => setHobbyInput(e.target.value)}
      />
      <button type="button" onClick={addHobby}>
        Add Hobby
      </button>

      {/* Preview current user input */}
      <div style={{ marginTop: "20px" }}>
        <h3>Preview:</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>Hobbies:</strong>
        </p>
        <ul>
          {user.hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>

      <button onClick={handlePost}>Submit Data</button>

      {/* Show submitted users */}
      <div style={{ marginTop: "40px" }}>
        <h3>Submitted Users:</h3>
        {submittedUsers.length === 0 ? (
          <p>No users submitted yet.</p>
        ) : (
          submittedUsers.map((u, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Name:</strong> {u.name}
              </p>
              <p>
                <strong>Age:</strong> {u.age}
              </p>
              <p>
                <strong>Hobbies:</strong>
              </p>
              <ul>
                {u.hobbies.map((hobby, i) => (
                  <li key={i}>{hobby}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostObjectArray;
