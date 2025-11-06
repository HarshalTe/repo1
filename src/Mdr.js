import React, { useState } from "react";

const Mdr = () => {
  const [data, setData] = useState([
    { id: 1, name: "Harshal", skills: ["React", "Node", "Redux"] },
    { id: 2, name: "Ramesh", skills: ["HTML", "CSS", "JavaScript"] },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    skills: [], // array
  });

  // Single handleChange
  const handleChange = (e) => {
    if (e.target.name === "skills") {
      // Add value to skills array using spread
      setForm({
        ...form,
        skills: [...form.skills, e.target.value] // push new value
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
  };

  // Add person
  const handleAddPerson = () => {
    if (!form.id || !form.name) return;
    setData([...data, form]);
    setForm({ id: "", name: "", skills: [] });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Developer</h2>

      <input
        type="number"
        name="id"
        placeholder="Enter ID"
        value={form.id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="skills"
        placeholder="Enter Skill"
        onChange={handleChange}
      />

      <div>
        <strong>Skills: </strong>
        {form.skills.map((s, i) => (
          <span key={i} style={{ marginRight: "8px" }}>{s}</span>
        ))}
      </div>

      <br />
      <button onClick={handleAddPerson}>Add Person</button>

      <h2>Developers List</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>
                <ul>
                  {person.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mdr;
