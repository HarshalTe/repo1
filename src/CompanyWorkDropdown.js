import React, { useState } from "react";

const CompanyWorkDropdown = () => {
  const aou = [
    {
      company: "google",
      work: ["web dev", "data science", "cyber security"],
    },
    {
      company: "facebook",
      work: ["app dev", "ios dev", "machine learning"],
    },
    {
      company: "apple",
      work: ["graphic design", "networking", "full-stack"],
    },
  ];

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedWork, setSelectedWork] = useState("");

  // 🔹 Handle company selection
  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setSelectedCompany(value);
    setSelectedWork(""); // reset work when company changes
  };

  // 🔹 Handle work selection
  const handleWorkChange = (e) => {
    const value = e.target.value;
    setSelectedWork(value);
  };

  // 🔹 Get company data for work dropdown
  const selectedCompanyData = aou.find(
    (item) => item.company === selectedCompany
  );

  return (
    <div style={{ margin: "20px" }}>
      <h3>Select Company and Work</h3>

      {/* Company Dropdown */}
      <select value={selectedCompany} onChange={handleCompanyChange}>
        <option value="">Select Company</option>
        {aou.map((item, index) => (
          <option key={index} value={item.company}>
            {item.company}
          </option>
        ))}
      </select>

      <br />
   
      {/* Work Dropdown */}
      <select
        value={selectedWork}
        onChange={handleWorkChange}
        disabled={!selectedCompany}
      >
        <option value="">Select Work</option>
        {selectedCompanyData &&
          selectedCompanyData.work.map((work, i) => (
            <option key={i} value={work}>
              {work}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CompanyWorkDropdown;
