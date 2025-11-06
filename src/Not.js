const Not = ()=>{
    const a  = 123;
   
    const returnvalue = ()=>{
        if(!a === 123){
             return "perfect"
        }
    }
     return(<>
          <h1>{returnvalue()}</h1>
     </>);
}
export default Not;