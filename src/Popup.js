import { useState } from "react";
import Popupform from "./Popupform";
const Popup = () => {
    const [show, setshow] = useState(false);
    
    const dummydata = {
          name1:'harshal',
          name2:'anshu',
          name3:'vikash',
          name4:'sujeet',
          name5:'sandip',
          name6:'sumeet',
          name7:'kabir',
          name8:'shubhama', 
    

    }

    const newarr = [
        
              {
                     frute1:"mangeo",
                     frute2:"grapes",
                     frute3:"banana",
                     frute4:"grapes"
              },
            
    ]
    
    

    const handleclick = () => {
        setshow(true);
        if (show === true) {
            setshow(false);
        }
    }

    return (<>
        {show ? <Popupform  setshow={setshow} dummydata={dummydata}  newarr={newarr} /> : ""}
        <div>
            <button onClick={handleclick}>SHOW</button>
        </div>


    </>)
}
export default Popup;