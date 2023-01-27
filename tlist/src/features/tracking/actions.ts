import { ITag } from "./trackingSlice"

export interface IUpdateTask {
  id: string
  text: string
}

export interface IUseTimeOption {
  id: string
  duration: number
}

export interface IAddTag {
  id: string
}

export interface IUpdateTag {
  taskId: string
  tagId: string
  value: string
}

export interface ISwitchStatus {
  id: string
}

export interface IAddGlobalTag {
  taskId: string
  tag: ITag
}

export interface IToggleBacklogFilter {
  displayName: string
}