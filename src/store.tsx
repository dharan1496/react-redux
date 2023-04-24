import { configureStore } from "@reduxjs/toolkit";
import TasksReducer from "./slices/task-slice";

export const store = configureStore({
    reducer: {
        tasks: TasksReducer
    }
})