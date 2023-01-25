import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUuid } from "../../util"
import { IAddTag, IUpdateTag, IUpdateTask, IUseTimeOption } from "./actions"

interface Priority {
  imediateBenefit: number,
  shortTermBenefit: number,
  longTermBenefit: number,
  imediateImpact: number,
  shortTermImpact: number,
  longTermImpact: number,
  effort: number
}

export interface ITag {
  id: string
  value: string
}

export interface ITask {
  id: string,
  text: string,
  tags: ITag[],
  duration: number,
  priority?: Priority,
  state: string
}

interface TrackingState {
  tasks: ITask[]
}

const initialState: TrackingState = {
  tasks: [{
    id: getUuid(),
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
        let tasks: ITask[] = JSON.parse(storage)
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
    },
    addTag: (state, action: PayloadAction<IAddTag>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          task.tags.push({
            id: getUuid(),
            value: "x"
          })
        }
      });
    },
    updateTag: (state, action: PayloadAction<IUpdateTag>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.taskId) {
          if (action.payload.value === "") {
            let filteredTags = task.tags.filter(t => {
              return (t.id != action.payload.tagId)
            });
            task.tags = filteredTags;
          } else {
            task.tags.forEach(tag => {
              if (tag.id == action.payload.tagId) {
                tag.value = action.payload.value
              }
            })
          }
          
        }
      });
    },
  },
})

export const { setTasks, loadTasksFromLocalStorage, updateText, useTimeOption, addTag, updateTag } = trackingSlice.actions

export default trackingSlice.reducer