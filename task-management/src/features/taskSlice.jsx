import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
  tasks: loadTasks(),
  loading: false,
  error: null,
  filter: "All",
  search: "",
};

export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=7"
  );
  const data = await response.data;
  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    dueDate: "",
    status: task.completed ? "Done" : "To Do",
  }));
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      saveTasks(state.tasks);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    markAsDone: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, status: task.status === "Done" ? "To Do" : "Done" }
          : task
      );
      saveTasks(state.tasks);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    searchTask:(state, action)=>{
        state.search = action.payload ;
    },
    updateTaskOrder:(state, action)=>{
      state.tasks = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        (state.loading = false), (state.tasks = action.payload);
        saveTasks(state.tasks);
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export const { addTask, editTask, deleteTask, markAsDone, setFilter, searchTask, updateTaskOrder } =
  taskSlice.actions;
