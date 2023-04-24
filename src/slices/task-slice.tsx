import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialState = {
  tasksList: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string;
};
export type Task = {
  id?: number;
  title: string;
  description: string;
};

const initialState: InitialState = {
  tasksList: [],
  selectedTask: null,
  isLoading: false,
  error: "",
};

export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:4000/tasks");
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    return rejectWithValue({ error: "No Tasks Found!" });
  }
);

export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task: Task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:4000/tasks", options);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    return rejectWithValue({ error: "Unable to add task!" });
  }
);

export const updateTaskToServer = createAsyncThunk(
  "tasks/updateTaskToServer",
  async (task: Task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:4000/tasks/${task.id}`,
      options
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    return rejectWithValue({ error: "Unable to update task!" });
  }
);

export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (id: number, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(`http://localhost:4000/tasks/${id}`, options);
    if (response.ok) {
      return id;
    }
    return rejectWithValue({ error: "Unable to delete task!" });
  }
);

export const TaskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      const task = { ...action.payload, id };
      state.tasksList.push(task);
    },
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task: Task) => task.id !== action.payload.id
      );
    },
    updateTaskInList: (state, action) => {
      state.tasksList = state.tasksList.map((task: Task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList = action.payload;
        state.error = "";
      })
      .addCase(getTasksFromServer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.tasksList = [];
      })
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList.push(action.payload);
        state.error = "";
      })
      .addCase(addTaskToServer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        state.error = "";
      })
      .addCase(updateTaskToServer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList = state.tasksList.filter(
          (task) => task.id !== action.payload
        );
        state.error = "";
      })
      .addCase(deleteTaskFromServer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskInList,
  setSelectedTask,
} = TaskSlice.actions;

export default TaskSlice.reducer;
