import { createSlice } from "@reduxjs/toolkit";

const Loginslice = createSlice({
    name:"login",
    initialState:{
        user:null,
    },
    reducers:{
     loginuser:(state,action)=>{
       state.user = action.payload;
    //    console.log( JSON.stringify(state.user) + "       state.user")
    //    const {email,password} =  state.user
        
     }
    }
})
export const {loginuser} = Loginslice.actions
export default Loginslice.reducer