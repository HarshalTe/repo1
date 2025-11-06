import { createSlice } from "@reduxjs/toolkit";

const slice  = createSlice({
    name:"user",
    initialState:{loding:false,fulldata:[],error:null,getdata:null},
    reducers:{
        postdata:(state,action)=>{
           state.fulldata.push(action.payload);
          
           
        },

    }
}) 
export const {postdata} = slice.actions
export default slice.reducer