import React, { useState } from "react";

const Dr = () => {
  const [data, setData] = useState([
    { id: 1, name: "Harshal", skills: ["React", "Node", "Redux"] },
    { id: 2, name: "Ramesh", skills: ["HTML", "CSS", "JavaScript"] },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    skills: [], // skills array
    currentSkill: "", // temporary input inside form state
  });

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add single skill into array
  const handleAddSkill = () => {
    if (form.currentSkill.trim() !== "") {
      setForm({
        ...form,
        skills: [...form.skills, form.currentSkill],
        currentSkill: "", // clear input
      });
    }
  };

  // Add person
  const handleAddPerson = () => {
    const newPerson = {
      id: form.id,
      name: form.name,
      skills: form.skills,
    };

    setData([...data, newPerson]);

    // clear form
    setForm({ id: "", name: "", skills: [], currentSkill: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Developer</h2>

      {/* Inputs */}
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

      {/* Skill input */}
      <input
        type="text"
        name="currentSkill"
        placeholder="Enter Skill"
        value={form.currentSkill}
        onChange={handleChange}
      />
      <button onClick={handleAddSkill}>Add Skill</button>

      {/* Show skills */}
      <div>
        <strong>Skills: </strong>
        {form.skills.map((s, i) => (
          <span key={i} style={{ marginRight: "8px" }}>
            {s}
          </span>
        ))}
      </div>

      <br />
      <button onClick={handleAddPerson}>Add Person</button>

      {/* Table */}
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

export default Dr;




// import React, { useState } from "react";

// const Dr = () => {
//   const [data, setData] = useState([
//     { id: 1, name: "Harshal", skills: ["React", "Node", "Redux"] },
//     { id: 2, name: "Ramesh", skills: ["HTML", "CSS", "JavaScript"] },
//   ]);

//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     skills: [], // sirf array
//   });

//   const [skillInput, setSkillInput] = useState(""); // temporary input

//   // Input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Add single skill into array
//   const handleAddSkill = () => {
//     setForm({
//       ...form,
//       skills: [...form.skills, skillInput],
//     });
//     setSkillInput(""); // input clear
//   };

//   // Add person
//   const handleAddPerson = () => {
//     const newPerson = {
//       id: form.id,
//       name: form.name,
//       skills: form.skills,
//     };

//     setData([...data, newPerson]);

//     // clear form
//     setForm({ id: "", name: "", skills: [] });
//     setSkillInput("");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Add Developer</h2>

//       {/* Inputs */}
//       <input
//         type="number"
//         name="id"
//         placeholder="Enter ID"
//         value={form.id}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="name"
//         placeholder="Enter Name"
//         value={form.name}
//         onChange={handleChange}
//       />

//       {/* Skill input */}
//       <input
//         type="text"
//         placeholder="Enter Skill"
//         value={skillInput}
//         onChange={(e) => setSkillInput(e.target.value)}
//       />
//       <button onClick={handleAddSkill}>Add Skill</button>

//       {/* Show skills */}
//       <div>
//         <strong>Skills: </strong>
//         {form.skills.map((s, i) => (
//           <span key={i} style={{ marginRight: "8px" }}>
//             {s}
//           </span>
//         ))}
//       </div>

//       <br />
//       <button onClick={handleAddPerson}>Add Person</button>

//       {/* Table */}
//       <h2>Developers List</h2>
//       <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Skills</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((person, index) => (
//             <tr key={index}>
//               <td>{person.id}</td>
//               <td>{person.name}</td>
//               <td>
//                 <ul>
//                   {person.skills.map((skill, i) => (
//                     <li key={i}>{skill}</li>
//                   ))}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dr;