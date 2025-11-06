import { createSlice } from "@reduxjs/toolkit";
import { update } from "./Firstslice";

const Postshowslice = createSlice({
    name: "postshow",
    initialState: {
        userdata: []
    },
    reducers: {
        Post: (state, action) => {
            state.userdata.push(action.payload);
        },
        Up: (state, action) => {
            const { updatedata, id } = action.payload
            console.log(JSON.stringify(updatedata) + "   JSON.stringify(updatedata)")

            state.userdata[id] = {
                ...state.userdata[id],
                ...updatedata,
            };

            // const {name,last} = updatedata;
            // state.userdata[id].name = name;
            //  state.userdata[id].last = last;  
        },
        del : (state,action)=>{
                const id  = action.payload
                 state.userdata = state.userdata.filter((_, index) => index !== id);
        }

    }

})
export const { Post, Up,del } = Postshowslice.actions;
export default Postshowslice.reducer 