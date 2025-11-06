import { useEffect, useState } from "react";

const New2 = ({ id, list, setlist }) => {
   const [formdata, setformdata] = useState({ name: "", last: "" });
   const change = (e) => {
      setformdata({ ...formdata, [e.target.name]: e.target.value })
   }

   useEffect(() => {
      setformdata(list[id]);
   }, [id])

   const save = (e) => {
      e.preventDefault();
      const update = [...list]
      update[id] = formdata;
      setlist(update);
      setformdata({ name: "", last: "" });
   }

   return (
      <>
         <h1>UPDATE FORM</h1>
         <br />
         <input type="text" placeholder="Enter First Name" name="name" value={formdata.name} onChange={change} />
         <br />
         <input type="text" placeholder="Enter Last Name" name="last" value={formdata.last} onChange={change} />
         <br />
         <button onClick={save}>SAVE</button>
      </>
   );
}
export default New2