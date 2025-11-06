
import { useState } from "react";
import "./style.css"

const Popupform = ({ setshow, dummydata,newarr }) => {




 

     const show = ()=>{
        let a = 20;
        let b  = 30;
        let c = a + b;
        return c;
     }


    const myarray = [1,2,3,4];
    myarray.push(33);


      const dummyobjects = {

        obj1:"abc1",
        obj2:"abc2",
      }

    const convert =  Object.values(dummyobjects);

    console.log("dummydata******************************" + JSON.stringify(dummydata));
    const [getnames,setgenames] = useState(Object.values(dummydata));

     console.log("===========================================all getnames" + getnames)


     const [getarray,setgetarray] = useState(newarr);


     console.log("////////////////////////////////////////////////////getarray" +  JSON.stringify(getarray));

    const formsttyle = {
        height: '400px',
        width: '400px',
        border: '2px solid black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

     const allkeys = Object.keys(getnames);
    //  console.log("allkeys" + allkeys);



    const close = () => {
        setshow(false);
    }

    return (
        <>
            <div style={formsttyle}>

       
                <h2>conver array</h2>
          
                   <h1>{show()}</h1>

                     {myarray.map((c,index)=>{
                        return(<>
                                  
                               <h1>{c + 1}</h1>
                        </>);
                     })}




                {getnames.map((ele, index) => (
                    <div key={index}>
                       
                          
                        <h3 className={ele === "anshu" ? "clr" : ""} >{ele}</h3>
                    </div>
                ))}
                
                 

                <button onClick={close}>CLOSE</button>
            
            </div>





        </>
    );
};

export default Popupform;
