import { createSlice } from "@reduxjs/toolkit";

const Firstslice = createSlice({
    name:"first",
    initialState:{
        users:[],
    },
    reducers:{
        add:(state,action)=>{
              state.users.push(action.payload)
              console.log(JSON.stringify(state.users) + "  JSON.stringify(state.users)")
        },
        update:(state,action)=>{
             const { dats, indexid } = action.payload;
         console.log("Updating index:", indexid, "with data:", dats);
         
        }
    }
})
export const {add,update} = Firstslice.actions;
export default Firstslice.reducer;