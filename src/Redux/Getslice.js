import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getdata = createAsyncThunk('getdata', async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    const res = await data.json();
    return res;
});

const Getslice = createSlice({
    name: "getdata",
    initialState: {
        userdata: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getdata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getdata.fulfilled, (state, action) => {
                state.loading = false;
                state.userdata = action.payload;
            })
            .addCase(getdata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default Getslice.reducer;
