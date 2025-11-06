

import { useState } from "react";
import Create from "./Create";
import Upload from "./Upload";
import Popup from "./Popup";
import Prev from "./Prev";
import GL from "./GL";
import AO from "./AO";
import Loop from "./Loop";
import Ref from "./Ref";
import L from "./L";
import Cu from "./Cu";
import Refrev from "./Refrev";
import Api from "./Api"
import PostObjectArray from "./New"
import UserTable from "./UserTable"
import Coustom from "./Coustom";
import Dropdown from "./Dropdown";
import Update from "./Update";
import U from "./U";
import Revup from "./Revup"
import Opration from "./Opration";
import Spr from "./Spr";
import Dr from "./Dr"
import Mdr from "./Mdr"
import Field from "./Field"
import P from "./P"
import A1 from "./A1";
import Postdata from "./Postdata"
import { useContext, Provider } from "react";
import Start from "./Start";
import New1 from "./New1";
import TicTacToe from "./TicTacToe";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Redux1 from "./Redux1";
import CrudRedux2 from "./Redux2";
import ArraysObjects from "./ArraysObjects";
import Login from "./Login";
import Login1 from "./Login1";
import First from "./First"
import Postshow from "./Postshow"
import CRUD1 from "./CRUD1";
import { createContext } from "react";
import Arraystring from "./Arraystring"
import Sp from "./Sp";
import Sp2 from "./Sp2"
import Child from "./Child";
import { log } from "./Sp3";
import Param from "./Param";
import C1 from "./C1";
import C2 from "./C2";
import C3 from "./C3";
import Contact from "./Contact";
import S1 from "./S1"
import Sc1 from './Sc1'
import Hmain from "./Hmain";
export const data1 = createContext();

const App = () => {



  const un = "harshal";


  // ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    const log = localStorage.getItem("log");
    return log ? children : <Navigate to="/" replace />;
  };
  return (<>
    {/* <First/> */}


    {/* <ArraysObjects/> */}
    {/* <CrudRedux/> */}
    {/* <TicTacToe/> */}
    {/* <Start/>  */}
    {/* <New1/> */}
    <br></br>
    <br></br>
    {/* <Cu/> */}
    {/* <A1/> */}
    {/* <P/> */}
    {/* <Field/> */}

    {/* <Mdr/> */}
    {/* <Dr/> */}
    {/* <Spr/> */}
    {/* <Opration/>  */}
    {/* <Revup/> */}
    {/* <U/> */}
    {/* <Update/> */}
    {/* <Dropdown/> */}
    {/* <Coustom/> */}

    {/* <UserTable/> */}

    {/* 
  <PostObjectArray/> */}

    {/* <Api/> */}

    {/* <Refrev/> */}

    {/* 
      <L/> */}

    {/* <Ref/> */}
    {/* <Loop/> */}

    {/* <AO/> */}

    {/* <Prev/> */}

    {/* <GL/> */}

    {/* <Popup/> */}
    {/* <Postshow/> */}
    {/* <data1.Provider value={un}>

             <CRUD1/>
     </data1.Provider> */}
    {/* <Arraystring/> */}


    {/* 
       <BrowserRouter>
  <Routes>
      <Route path="/"  element={<Sp/>}></Route>
       
          <Route
            path="/home/:id"
            element={
              <ProtectedRoute>
                <Sp2 />
              </ProtectedRoute>
            }
          />
  </Routes>
  </BrowserRouter> */}

    {/* <Child>
     <h1>child 1</h1>
        <h1>child 2</h1>
        <h1>child 3</h1>
  </Child> */}

{/* 
   <BrowserRouter>
      <Routes>
        <Route path="/show/:id" element={<Param />} />
        <Route path="/con/" element={<Contact/>}>
             <Route path="c1" element={<C1 />} />
             <Route path="c2" element={<C2 />} />
             <Route path="c3" element={<C3 />} />
        </Route>
           
      </Routes>
    </BrowserRouter> */}
    {/* <S1/> */}
    {/* <Sc1/> */}
    <Hmain/>

  </>);
}
export default App;
