import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUpdateTask, IUseTimeOption } from "./actions"

interface Priority {
  imediateBenefit: number,
  shortTermBenefit: number,
  longTermBenefit: number,
  imediateImpact: number,
  shortTermImpact: number,
  longTermImpact: number,
  effort: number
}

export interface Task {
  id: string,
  text: string,
  tags: string[],
  duration: number,
  priority?: Priority,
  state: string
}

interface TrackingState {
  tasks: Task[]
}

const initialState: TrackingState = {
  tasks: [{
    id: "000000x",
    text: "Todo",
    tags: [],
    state: 'open',
    duration: 0
  }]
}

const LOCAL_STORAGE_KEY = "tlist-1.0-tasks"

const trackingSlice = createSlice({
  name: 'tracking',
  initialState: initialState,
  reducers: {
    loadTasksFromLocalStorage: (state) => {
      let storage = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storage) {
        let tasks: Task[] = JSON.parse(storage)
        state.tasks = tasks
      }
    },
    setTasks: (state) => {
      let storage = JSON.stringify(state.tasks)
      localStorage.setItem(LOCAL_STORAGE_KEY, storage)
    },
    updateText: (state, action: PayloadAction<IUpdateTask>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          task.text = action.payload.text
        }
      });
    },
    useTimeOption: (state, action: PayloadAction<IUseTimeOption>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          task.duration = action.payload.duration
        }
      });
    }
  },
})

export const { setTasks, loadTasksFromLocalStorage, updateText, useTimeOption } = trackingSlice.actions

export default trackingSlice.reducer