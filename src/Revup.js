import { useState } from "react";

const Revup = () => {
    const initialData = [
        {
            id: 1,
            name: "harshal",
            number: 101
        },
        {
            id: 2,
            name: "suraj",
            number: 102
        },
        {
            id: 3,
            name: "prathamesh",
            number: 103
        }
    ]
    const [datalist, setdatalist] = useState(initialData);
    const [dataid, setdataid] = useState(null);
    const [formdata, setformdata] = useState(
        { name: "", number: null }
    );

    const Form = (ele) => {
        setdataid(ele.id);
        setformdata({ name: ele.name, number: ele.number });
    }

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
    const submitdata = (e) => {
    e.preventDefault();

    const final = datalist.map((itm) => {
        if (itm.id === dataid) {
            return { ...itm, name: formdata.name, number: formdata.number };
        }else {
            return itm;
        } 
    });
        setdatalist(final);
      setformdata({ name: "", number: "" }); 

 
};

    return (
        <>
            {datalist.map((ele, index) => {
                return (
                    <>
                        <div key={index} style={{ display: "flex" }}>
                            <h1>{ele.id}</h1>
                            <h1>{ele.name}</h1>
                            <h1>{ele.number}</h1>
                            <h1><button onClick={() => Form(ele)}>UPDATE</button></h1>
                        </div>

                    </>
                );
            })}
            <br></br>
            <input type="text" name="name" value={formdata.name} onChange={handlechange} />
            <input type="text" name="number" value={formdata.number} onChange={handlechange} />
            <button onClick={submitdata}>SUBMIT</button>

        </>
    );
}
export default Revup;