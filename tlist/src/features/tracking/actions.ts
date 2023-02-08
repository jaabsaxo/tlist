import { ITag } from "./trackingSlice"

export interface IUpdateTask {
  id: string
  text: string
}

export interface IUseTimeOption {
  id: string
  duration: number
}

export interface IAddTagToTask {
  taskId: string
  tagId: string
}

export interface IUpdateTag {
  taskId: string
  tagId: string
  value: string
}

export interface ISwitchStatus {
  id: string
}

export interface IAddOrUpdateGlobalTag {
  id: string
  displayName: string
  isSetAsBacklogFilter: boolean
}

export interface IToggleBacklogFilter {
  displayName: string
}

export interface IToggleBacklogTagFilter {
  id: string
}

export interface ISetTaskState {
  taskId: string
  taskState: string
}

export interface IDeleteTask {
  taskId: string
}

export interface ISetShowStatistics {
  showStatistics: boolean
}