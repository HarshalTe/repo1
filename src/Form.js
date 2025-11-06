import { useState } from "react";

const form = () => {
  const datas = { name: "", email: "", password: "" }
  const [info, setinfo] = useState(datas);
  const [flag, setflag] = useState(false);

 const [allData, setAllData] = useState([]);

  const handlechange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    if (info.name === "" || info.email === "" || info.password === "") {
      alert("all fields are mendatory");
    }
    else {


      setflag(true);
       setAllData([...allData, { Name: info.name, Email: info.email }]);
          setinfo(datas);
    }
  }

  return (<>
    <form onSubmit={handlesubmit}>

      <h1>Ragistration Fomr</h1>
      <input type="text" name="name" placeholder="Enter Your Name" value={info.name} onChange={handlechange} />
      <input type="text" name="email" placeholder="Enter Your Email" value={info.email} onChange={handlechange} />
      <input type="password" name="password" placeholder="Enter Your Password" value={info.password} onChange={handlechange} />
      <button type="submit">SUBMIT</button>
    </form>
    {flag ? <h1> congratulation {info.name} you ragister succefully</h1> : ""}
       {allData.map((item, index) => (
        <div key={index}>
          <h3>{item.Name}</h3>
          <h3>{item.Email}</h3>
      
          <hr />
        </div>
      ))}

  </>);
}
export default form;
