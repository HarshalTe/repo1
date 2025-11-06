const GL = () => {
   var  newvar = 700;
    
   const change = ()=>{
       newvar = 800;
   }


    const global = "i am global variable"
    var access = null;
    var local = () => {
        return "i am local function"
    }

    access = local();

    const show = (number)=>{
    
       alert("show funcion call" + number);
    }
      
  



    return (<>
        <h1>{access + "    "}{global}</h1>
        <p>{newvar}</p>

        <button onClick={()=>show(33)}>CLICK</button>


    </>);
}
export default GL;