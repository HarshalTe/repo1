import { useState } from "react"
import A1u  from "./A1u";
const A1 = () => {
  const [userdata, setuserdata] = useState({
    name: "",
    lname:"",
    skills: [""], // ek khaali skill input initially
  });
const [show,setshow] = useState(false)
const[id,setid]= useState(null);
const up = (i,list)=>{
    setshow(true);
    setid(i)
}
  const [showlist, setshowlist] = useState([]);


  // name change
  const handleNameChange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  // skill change
  const handleSkillChange = (index, value) => {
    const newSkills = [...userdata.skills];
    newSkills[index] = value; // us index ka value update karo
    setuserdata({ ...userdata, skills: newSkills });
  };

  // add new empty skill field
  const addSkillField = () => {
    setuserdata({ ...userdata, skills: [...userdata.skills, ""] });
  };

  // submit
  const sub = (e) => {    
    e.preventDefault();
    setshowlist((list) => [...list, userdata]);
  };

  return (
    <>
      <h1>USERDATA</h1>

      <input
        type="text"
        placeholder="name"
        value={userdata.name}
        name="name"
        onChange={handleNameChange}
      />
      <br />
        <input
        type="text"
        placeholder="last name"
        value={userdata.lname}
        name="lname"
        onChange={handleNameChange}
      />
      <br />


      {userdata.skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="skills"
            value={skill} // har ek input apna string lega
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
        </div>
      ))}

      <br />
      <button onClick={addSkillField}>ADD SKILL FIELD</button>
      <br />
      <button onClick={sub}>SUBMIT</button>

      {showlist.map((list, i) => (
        <div key={i}>
          <h2>{list.name}</h2>
          <h2>{list.lname}</h2>
          <h2>{list.skills.join(", ")}</h2>
          <button onClick={()=>up(i,list)}>update</button>
        </div>
      ))}
      <br></br>
      {show && <A1u showlist={showlist} id={id}/>}
    </>
  );
};

export default A1;
