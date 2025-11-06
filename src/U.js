import React, { useState } from "react";

const initialData = [
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Sarah", age: 35 },
];

function U() {
  const [data, setData] = useState(initialData);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleEditClick = (item) => {
    setEditingRow(item.id);
    setFormData({ name: item.name, age: item.age });
  };


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const updatedData = data.map((item) => {
    if (item.id === editingRow) {
      return {
        ...item,
        name: formData.name,
        age: parseInt(formData.age),
      };
    }
    return item;
  });

  setData(updatedData);
  setEditingRow(null); // Close form
};





  return (
    <div style={{ padding: "20px" }}>
      <h2>Data Table</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={() => handleEditClick(item)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRow && (
        <div style={{ marginTop: "20px" }}>
          <h3>Update Data (ID: {editingRow})</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Age:{" "}
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() => setEditingRow(null)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default U;
