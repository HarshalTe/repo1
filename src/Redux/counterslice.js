import { createSlice } from "@reduxjs/toolkit";
const couterslice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
    },
    reducers: {
        increment: (state) => {
            state.count = state.count + 1;
        },
        decrement: (state) => {
            state.count = state.count - 1;
            // if (state.count > 0) {
            // }

        }
    }
})
export const { increment, decrement } = couterslice.actions
export default couterslice.reducer