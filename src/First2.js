import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { update } from "././Redux/Firstslice";
import { useDispatch } from "react-redux";
const First2 = ({ indexid }) => {
  const getdata = useSelector((state) => state.first.users);
  const [dats, setdatas] = useState({ name: "", last: "" });
  const dispatch = useDispatch()
  
  useEffect(() => {
    const user = getdata[indexid];
    if (user) {
      setdatas({ name: user.name, last: user.last });
    }
  }, [indexid, getdata]);

  const ch = (e) => {
    setdatas({ ...dats, [e.target.name]: e.target.value });
  };

  const up = (e) => {
    e.preventDefault();
   
     dispatch(update({ dats, indexid })); 
  };

  return (
    <>
      <h1>UPDATE DATA</h1>
      <br />
      <input
        type="text"
        placeholder="First Name"
        name="name"
        value={dats.name}
        onChange={ch}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        name="last"
        value={dats.last}
        onChange={ch}
      />
      <br />
      <button onClick={up}>SUBMIT</button>
      <br />
    </>
  );
};

export default First2;
