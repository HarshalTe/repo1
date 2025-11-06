import { createSlice } from "@reduxjs/toolkit";

const postslice = createSlice({
    name: "post",
    initialState: {
        postdata: [],
    },
    reducers: {
        add: (state, action) => {
            state.postdata.push(action.payload);
            console.log(JSON.stringify(state.postdata) + "state.postdata");
        },
    }
});
export const { add } = postslice.actions;
export default postslice.reducer;