import { Link, Outlet } from "react-router-dom";


const Contact = ()=>{
    return(
        <>
           <Link to={'c1'}>C1</Link>
           <br></br>
           <Link to={'c2'}>C2</Link>
              <br></br>
           <Link to={'c3'}>C3</Link>
       
           <Outlet/>
        </>
    );
}
export default Contact;