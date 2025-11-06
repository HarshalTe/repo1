import React, { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([
    { input1: "", input2: "", dropdown1: "", dropdown2: "" },
  ]);

  const dropdownOptions1 = ["Option A1", "Option A2", "Option A3"];
  const dropdownOptions2 = ["Option B1", "Option B2", "Option B3"];



  // Add new set of fields
  const handleAdd = () => {
    setFields([
      ...fields,
      { input1: "", input2: "", dropdown1: "", dropdown2: "" },
    ]);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Dynamic Array Fields</h2>

      {fields.map((field, index) => (
        <div
          key={index}
        >
          {/* Input 1 */}
          <input
            type="text"
            name="input1"
            placeholder="Enter first value"
      
           
          />

          {/* Input 2 */}
          <input
            type="text"
            name="input2"
            placeholder="Enter second value"
      
      
          />

          {/* Dropdown 1 */}
          <select
            name="dropdown1"
            value={field.dropdown1}
          
          >
            <option value="">Select Option 1</option>
            {dropdownOptions1.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* Dropdown 2 */}
          <select
            name="dropdown2"
            value={field.dropdown2}
        
          >
            <option value="">Select Option 2</option>
            {dropdownOptions2.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Add Button */}
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default DynamicForm;
