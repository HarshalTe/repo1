import { useState } from "react";

const Da = () => {
    const [fieldarry, setfieldarry] = useState([{ text1: "", text2: "", drop1: "", drop2: "" }]);
    const [datas,setdatas] = useState();
    const [list, setlist] = useState([]);
    const [values1, setvalues1] = useState(['val1', 'val2', 'val3', 'val4']);
    const [values2, setvalues2] = useState(['val5', 'val6', 'val7', 'val8']);
    const a = "harshal"
    const ch = (e) => {
        setdatas({ ...datas, [e.target.name]: e.target.value })
    }
    const add = (e) => {
        e.preventDefault();
        setfieldarry([...fieldarry, { text1: "", text2: "", drop1: "", drop2: "" }]);
        setlist([...list, datas]);
    }
    const del = (i) => {
        const copyarray = [...fieldarry];
        const d = copyarray.filter((dd, di) => {
            return i != di
        })
        setfieldarry(d);
    }


    return (
        <>
            {
                fieldarry.map((e, i) => {
                    return (
                        <div key={i}>
                            <input name="text1" value={fieldarry.text1} onChange={ch} placeholder="first" />
                            <br></br>
                            <input name="text2" value={fieldarry.text1} onChange={ch} placeholder="second" />
                            <br></br>
                            <select onChange={ch} value={fieldarry.drop1}>
                                <option>name1</option>
                                {
                                    values1.map((ae, ai) => {

                                        return (

                                            <option key={ai}>
                                                <h1>{ae}</h1>
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <br></br>
                            <select onChange={ch} value={fieldarry.drop2}>
                                <option>name2</option>
                                {
                                    values2.map((ae2, ai2) => {

                                        return (

                                            <option key={ai2}>
                                                <h1>{ae2}</h1>
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <br />
                            <button onClick={() => del(i)} >Delete</button>
                        </div>
                    );
                })
            }
            <button onClick={add}>ADD</button>
            <br></br>
            {list.map((data, dataid) => {
                return (
                    <div key={dataid}>
                        <h1> {data.text1}</h1>
                        <h1> {data.text2}</h1>
                        <h1> {data.drop1}</h1>
                        <h1> {data.drop2}</h1>
                    </div>
                );

            })}


        </>
    );
}
export default Da;