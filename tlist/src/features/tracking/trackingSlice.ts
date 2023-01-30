import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUuid } from "../../util"
import { IAddGlobalTag, IAddTag, ISwitchStatus, IToggleBacklogFilter, IUpdateTag, IUpdateTask, IUseTimeOption } from "./actions"

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
      tags: [],
      cardState: 'closed',
      duration: 5,
      taskState: 'todo',
      isActive: false,
      isComplete: false
    },
    {
      id: getUuid(),
      text: "Write of content package",
      tags: [],
      cardState: 'closed',
      duration: 10,
      taskState: 'done',
      isActive: false,
      isComplete: false
    },
    {
      id: getUuid(),
      text: "Do some work on OAS",
      tags: [],
      cardState: 'closed',
      duration: 60,
      taskState: 'todo',
      isActive: false,
      isComplete: false
    },
    {
      id: getUuid(),
      text: "Discus X with Jason",
      tags: [],
      cardState: 'closed',
      duration: 30,
      taskState: 'todo',
      isActive: false,
      isComplete: false
    }
  ],
  tags: [
    {
      id: getUuid(),
      value: "UX"
    },
    {
      id: getUuid(),
      value: "TradingView"
    }
  ]
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
    addBlankTag: (state, action: PayloadAction<IAddTag>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.id) {
          task.tags.push({
            id: getUuid(),
            value: ""
          })
        }
      });
    },
    addGlobalTag: (state, action: PayloadAction<IAddGlobalTag>) => {
      state.tasks.forEach(task => {
        if (task.id === action.payload.taskId) {
          task.tags.push(action.payload.tag)
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
    toggleBacklogFilter: (state, action: PayloadAction<IToggleBacklogFilter>) => {
      state.backlogFilters.forEach(f => {
        if (f.displayName === action.payload.displayName) {
          f.isSet = !f.isSet
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
              task.tags.forEach(tag => {
                let addToGlobalTags = true
                state.tags.forEach(globalTag => {
                  if (globalTag.id == tag.id) {
                    addToGlobalTags = false
                  }
                })
                if (addToGlobalTags) {
                  state.tags.push(tag)
                }
              })
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
    }
  },
})

export const { openOrClose, switchCompletionState, setInActive, setActive, toggleBacklogFilter, loadTasksFromLocalStorage, updateText, useTimeOption, addBlankTag, updateTag, addGlobalTag } = trackingSlice.actions

export default trackingSlice.reducer