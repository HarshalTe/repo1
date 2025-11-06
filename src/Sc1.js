import { useState } from "react";

const Sc1 = () => {
    const [userdata, setuserdata] = useState({ first: "", last: "", dd: "" ,fruit:"",state:""});
    const [list, setlist] = useState([]);
    const [id, setid] = useState(null);
    const dropdown1 = [
        { fruit: "f1", state: "s1" },
        { fruit: "f2", state: "s2" },
        { fruit: "f3", state: "s3" },
    ]

    const dropdowndata = [
        "virar",
        "nalasopara",
        "vasairoad",
        "naygaw",
        "bhayandar",
        "miraroad",
        "dahisar",
        "boriwali",
    ];

    const change = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    };

    const click = (e) => {
        e.preventDefault();

        if (id !== null) {
            const updatedList = [...list];
            updatedList[id] = userdata;
            setlist(updatedList);
            setid(null);
        } else {
            setlist([...list, userdata]);
        }

        setuserdata({ first: "", last: "", dd: "" });
    };

    const up = (i) => {
        setid(i);
        setuserdata(list[i]);
    };

    const del = (i) => {
        const dt = list.filter((e, index) => i !== index);
        setlist(dt);
    };

    return (
        <>
            <h1>CREATE DATA</h1>

            <input
                type="text"
                name="first"
                placeholder="First Name"
                onChange={change}
                value={userdata.first}
            />
            <br />

            <select onChange={change} name="dd" value={userdata.dd}>
                <option value="">Select city</option>
                {dropdowndata.map((d, i) => (
                    <option key={i} value={d}>
                        {d}
                    </option>
                ))}
            </select>
            <br />
            <select>
            {dropdown1.map((e,i)=>{
                return(
                    <div key={i}>
                       <option>{e.fruit}</option> 
                       <option>{e.state  }</option>       
                    </div>
                );
            })}
            </select>
            <br/>

            <input
                type="text"
                name="last"
                placeholder="Last Name"
                onChange={change}
                value={userdata.last}
            />
            <br />

            <button onClick={click}>{id !== null ? "UPDATE" : "CREATE"}</button>
            <br />

            {list.map((e, i) => (
                <div key={i}>
                    <h2>{e.first}</h2>
                    <h3>{e.dd}</h3>
                    <h3>{e.last}</h3>
                    <button onClick={() => up(i)}>UPDATE</button>
                    <button onClick={() => del(i)}>DELETE</button>
                </div>
            ))}
        </>
    );
};

export default Sc1;
