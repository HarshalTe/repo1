import { useState } from "react";
import { add } from "././Redux/Firstslice";
import { useDispatch, useSelector } from "react-redux";
import First2 from "./First2";

const First = () => {
  const [userdata, setuserdata] = useState({ name: "", last: "" });
  const [show, setshow] = useState(false);
  const [indexid, setindexid] = useState(null);

  const info = useSelector((state) => state.first.users);
  const dispatch = useDispatch();

  const ch = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const sub = (e) => {
    e.preventDefault();
    dispatch(add(userdata));
    setuserdata({ name: "", last: "" });
  };

  // ✅ Renamed function (no conflict now)
  const handleUpdate = (i) => {
    setshow(true);
    setindexid(i);
  };

  return (
    <>
      <h1>FORM DATA</h1>
      <br />
      <input
        type="text"
        placeholder="First Name"
        name="name"
        value={userdata.name}
        onChange={ch}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        name="last"
        value={userdata.last}
        onChange={ch}
      />
      <br />
      <button onClick={sub}>SUBMIT</button>
      <br />
      <h1>LIST DATA</h1>
      {info.map((e, i) => (
        <div key={i}>
          <h2>{e.name}</h2>
          <h2>{e.last}</h2>
          {/* ✅ Pass correct index */}
          <button onClick={() => handleUpdate(i)}>Update</button>
        </div>
      ))}

      <br />
      {/* ✅ Show update form when a row is selected */}
      {show && <First2 indexid={indexid} />}
    </>
  );
};

export default First;
