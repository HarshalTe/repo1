import React, { useState } from "react";

const UserTable = () => {
  // initial form state
  const initialUser = { name: "", middle: "", last: "" };

  const [user, setUser] = useState(initialUser); // form input ke liye
  const [list, setList] = useState([]);          // table ke liye
  const [editIndex, setEditIndex] = useState(null); // update ke liye

  // input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // form submit (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // update mode
      const updatedList = [...list];
      updatedList[editIndex] = user;
      setList(updatedList);
      setEditIndex(null); // reset edit mode
    } else {
      // add mode
      setList([...list, user]);
    }

    setUser(initialUser); // reset form
  };

  // update button click
  const handleEdit = (index) => {
    setUser(list[index]);     // input me value fill
    setEditIndex(index);      // kis row ko update karna hai uska index store
  };

  return (
    <div>
      <h1>Create & Update Users</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="middle"
          placeholder="Middle Name"
          value={user.middle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last"
          placeholder="Last Name"
          value={user.last}
          onChange={handleChange}
        />
        <button type="submit">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <br />

      {/* Table */}
      <table border="1" cellSpacing="0" cellPadding="5">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((ele, index) => (
            <tr key={index}>
              <td>{ele.name}</td>
              <td>{ele.middle}</td>
              <td>{ele.last}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Update</button>
              </td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
