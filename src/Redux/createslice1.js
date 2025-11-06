import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";


const createslice1 = createSlice({
    name:'crud1',
    initialState:{userdata:[]},
    reducers:{
        Create:(state,action)=>{
            state.userdata.push(action.payload);  
           
        },
        Update:(state,action)=>{
          const  {id,name,last} = action.payload;
          if (state.userdata[id]) {
        state.userdata[id] = { name, last };       // overwrite the object
      }
        }
    }
})
export const {Create,Update} = createslice1.actions
export default createslice1.reducer