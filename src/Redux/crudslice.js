import { createSlice } from "@reduxjs/toolkit";
import { update } from "./Firstslice";

const crudslice = createSlice({
    name: 'crud',
    initialState: {
        alldata: []
    },
    reducers: {
        add: (state, action) => {

            state.alldata.push(action.payload);
        },
        up: (state, action) => {
            const { id, userdata } = action.payload;
            console.log(JSON.stringify(id, userdata) + '       id,userdata')
            state.alldata[id] = userdata;
        },
        deleted: (state, action) => {
            const id = action.payload;
            state.alldata = state.alldata.filter((_, index) => {
                return id !== index
            })


        }

    }
})
export const { add, up, deleted } = crudslice.actions;
export default crudslice.reducer;