import { useState } from "react";

const Dropdown1 = () => {
    const [getname, setgetname] = useState('');
    const change = (e) => {
        setgetname(e.target.value);
    }

    const objectarray = [
        {
            username: "harshal",
            fr: ["mango"]
        },
        {
            username: 'anshu',
            fr: ["banana"]
        },
        {
            username: "sandip",
            fr: ['grapes']
        },
        {
            username: "vikash",
            fr: ["orange"]
        }
    ];

    const gerfr = objectarray.filter((all, index) => {
        return all.username === getname;
    });

    return (
        <>
            <select value={getname} onChange={change}>
                   <option value="">Select Company</option>
                {
                    objectarray.map((e, i) => {
                        return (
                            <option key={i} value={e.username}>
                                {e.username}
                            </option>
                        );
                    })
                }
            </select>
            <br></br>
            <select>
                   <option value="">Select Fruit  </option>
                {gerfr.map((de, di) => {
                    return (
                        <option key={di} >{de.fr}</option>
                    );
                })}
            </select>

            <br></br>
            <h1>{getname}</h1>
        </>
    );
}
export default Dropdown1;
