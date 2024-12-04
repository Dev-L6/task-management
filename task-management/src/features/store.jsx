import { configureStore } from "@reduxjs/toolkit";
import {taskSlice} from "./taskSlice.jsx";

export const store = configureStore({
    reducer:{
        tasks: taskSlice.reducer,
    }
})