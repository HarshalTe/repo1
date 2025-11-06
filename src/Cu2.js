import { use, useState } from "react";

const Cu2 = ({ show, setshow, select,setlist,list }) => {
    const [info, setinfo] = useState({...select})
    const cansel = () => {
        setshow(false)
    }

    const ch = (e)=>{
        setinfo({...info,[e.target.name]:e.target.value});  
    }
    const up = (e)=>{
        e.preventDefault();
        const updatedList = [...list];
        updatedList[select.index] = info;
        setlist(updatedList);
        setshow(false);
    }

    return (<>

        <input type="text" placeholder="First Name" name="name"  value={info.name} onChange={ch}/>
        <input type="text" placeholder="Middle Name" name="middle"  value={info.middle} onChange={ch}/>
        <input type="text" placeholder="Last Name" name="last" value={info.last} onChange={ch} />
        <button onClick={up}>SUBMIT DATA</button>
        <button onClick={cansel}>CANCEL</button>




    </>);
}
export default Cu2;