import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUuid } from "../../util"
import { IAddOrUpdateGlobalTag, IAddTagToTask, IDeleteTask, ISetTaskState, ISwitchStatus, IToggleBacklogFilter, IToggleBacklogTagFilter, IUpdateTask, IUseTimeOption } from "./actions"

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
  displayName: string
  isSetAsBacklogFilter: boolean
}

export interface ITask {
  id: string,
  text: string,
  tagIds: { id: string }[],
  duration: number,
  priority?: Priority,
  cardState: string,
  taskState: string,
  isActive: boolean,
  isComplete: boolean
}

interface TrackingState {
  tasks: ITask[]
  tags: ITag[]
  backlogFilters: {
    displayName: string
    isSet: boolean
  }[]
}

const initialState: TrackingState = {
  backlogFilters: [
    { displayName: "done", isSet: true },
    { displayName: "todo", isSet: true }
  ],
  tasks: [
    {
      id: getUuid(),
      text: "Groom Articles Overview in Figma",
      tagIds: [],
      cardState: 'closed',
      duration: 5,
      taskState: 'todo',
      isActive: false,
      isComplete: false
    },
    {
      id: getUuid(),
      text: "Write of content package",
      tagIds: [],
      cardState: 'closed',
      duration: 10,
      taskState: 'done',
      isActive: false,
      isComplete: false
    },
    {
      id: getUuid(),
      text: "Do some work on OAS",
      tagIds: [],
      cardState: 'closed',
      duration: 60,
      taskState: 'todo',
      isActive: false,
      isComplete: false
    },
    {
      id: getUuid(),
      text: "Discus X with Jason",
      tagIds: [],
      cardState: 'closed',
      duration: 30,
      taskState: 'todo',
      isActive: false,
      isComplete: false
    }
  ],
  tags: []
}

const LOCAL_STORAGE_KEY = "tlist-1.0"

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
    addOrUpdateGlobalTag: (state, action: PayloadAction<IAddOrUpdateGlobalTag>) => {
      let tagIsNew = true
      state.tags.forEach(tag => {
        if (tag.id == action.payload.id) {
          tag.displayName = action.payload.displayName
          tag.isSetAsBacklogFilter = action.payload.isSetAsBacklogFilter
          tagIsNew = false
        }
      })
      if (tagIsNew) {
        state.tags.push({
          id: action.payload.id,
          displayName: action.payload.displayName,
          isSetAsBacklogFilter: true
        })
      }
    },
    removeTagFromTask: (state, action: PayloadAction<IAddTagToTask>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.taskId) {
          let filtedTags = task.tagIds.filter(tagIdObj => {
            return tagIdObj.id != action.payload.tagId
          })
          task.tagIds = filtedTags
        }
      });
    },
    addGlobalTagToTask: (state, action: PayloadAction<IAddTagToTask>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.taskId) {
          let TagIsNewToTask = true
          task.tagIds.forEach(obj => {
            if (obj.id === action.payload.tagId) {
              TagIsNewToTask = false
            }
          })

          if (TagIsNewToTask) {
            task.tagIds.push({ id: action.payload.tagId })
          }
        }
      });
    },
    toggleBacklogFilter: (state, action: PayloadAction<IToggleBacklogFilter>) => {
      state.backlogFilters.forEach(f => {
        if (f.displayName === action.payload.displayName) {
          f.isSet = !f.isSet
        }
      })
    },
    toggleBackLogTagFilter: (state, action: PayloadAction<IToggleBacklogTagFilter>) => {
      state.tags.forEach(tag => {
        if (tag.id === action.payload.id) {
          tag.isSetAsBacklogFilter = !tag.isSetAsBacklogFilter
        }
      })
    },
    openOrClose: (state, action: PayloadAction<ISwitchStatus>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          if (task.isActive === false) {
            if (task.cardState === 'open') {
              task.cardState = 'closed'
              let storage = JSON.stringify(state)
              localStorage.setItem(LOCAL_STORAGE_KEY, storage)
            } else {
              task.cardState = 'open'
            }
          }
        }
      });
    },
    setActive: (state, action: PayloadAction<ISwitchStatus>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          task.isActive = true
        }
      });
    },
    setInActive: (state, action: PayloadAction<ISwitchStatus>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          task.isActive = false
        }
      });
    },
    switchCompletionState: (state, action: PayloadAction<ISwitchStatus>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          if (task.isComplete === false) {
            task.isComplete = true
          } else {
            task.isComplete = false
          }
        }
      });
    },
    setTaskState: (state, action: PayloadAction<ISetTaskState>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.taskId) {
          task.taskState = action.payload.taskState
          task.isActive = false
        }
      });
    },
    newEmptyTask: (state) => {
      state.tasks.unshift({
        id: getUuid(),
        text: " ",
        tagIds: [],
        cardState: 'open',
        duration: 5,
        taskState: 'todo',
        isActive: false,
        isComplete: false
      })
    },
    deleteTask: (state, action: PayloadAction<IDeleteTask>) => {
      let filteredTasks = state.tasks.filter(task => {
        return (task.id != action.payload.taskId)
      })
      state.tasks = filteredTasks
    },
  },
})

export const { newEmptyTask, deleteTask, openOrClose, switchCompletionState, setInActive, setActive, setTaskState, toggleBacklogFilter, toggleBackLogTagFilter, loadTasksFromLocalStorage, updateText, useTimeOption, addGlobalTagToTask, removeTagFromTask, addOrUpdateGlobalTag } = trackingSlice.actions

export default trackingSlice.reducer