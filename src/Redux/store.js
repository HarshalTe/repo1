import { configureStore } from "@reduxjs/toolkit";
import couterslice from "./counterslice";
import postslice from "./postslice";
import slice from "./slice";
import createslice1 from "./createslice1"
import Loginslice from "./Loginslice"
import Firstslice from "./Firstslice"
import Postshowslice from "./Postshowslice"
import crudslice from "./crudslice"
const store = configureStore({
  reducer: {
    counter: couterslice,
    post: postslice,
    user: slice,
    crud1:createslice1,
    login:Loginslice,
    first:Firstslice,
    postshow:Postshowslice,
    crud:crudslice
  },
});

export default store;
