import { v4 as uuidv4 } from 'uuid';
import { IBacklogFilter, ITag, ITask } from './features/tracking/trackingSlice';

export function getUuid() {
  return uuidv4();
}

export function getTimestampInSeconds() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return day + "-" + month + "-" + year
}

export function getTimeStampUTC() {
  let date = new Date()
  return date.getTime()
}

export function getDateFromTimeStamp(UTCTime: number) {
  let date = new Date(UTCTime)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return day + "-" + month + "-" + year
}

/*
export function getTasksByTags(tasks: ITask[], tags: ITag[], condition: string) {
  if (tasks) {
    if (condition === "OR") {
      return tasks.filter((task: ITask) => {
        let includeTask = false
        tags.forEach((tag: ITag) => {
          task.tagIds.forEach(taskTagId => {
            if (taskTagId.id === tag.id) {
              includeTask = true
            }
          })
        })
        return includeTask
      })
    } else if (condition === "AND") {
      return tasks.filter((task: ITask) => {
        let includeTask = false
        task.tagIds.forEach(taskTagId => {
          let taskTagIdIsNotInTheListOfTags = true 
          tags.forEach(tag => {
            if (tag.id === taskTagId.id) {
              taskTagIdIsNotInTheListOfTags = false
            }
          })
          if (taskTagIdIsNotInTheListOfTags) {
            includeTask = true
          }
        })
        return includeTask
      })
    }
  }
}
*/

export function getSelectedTasks(tasks: ITask[], globalTags: ITag[], backlogFilters: IBacklogFilter[]) {
  let selectedTasks = tasks;

  let allStatesAreOff = true
  backlogFilters.forEach(filter => {
    if (filter.isSet) {
      allStatesAreOff = false
    }
  })

  if (!allStatesAreOff) {
    selectedTasks = selectedTasks.filter(task => {
      let includeTask = false
      backlogFilters.forEach(filter => {
        if (task.taskState === filter.displayName && filter.isSet) {
          includeTask = true
        }
      })
      return (includeTask)
    })
  }

  let allTagTagsAreOff = true
  globalTags.forEach(tag => {
    if (tag.isSetAsBacklogFilter) {
      allTagTagsAreOff = false
    }
  })

  if (!allTagTagsAreOff) {
    selectedTasks = selectedTasks.filter(task => {
      let includeTask = false
      globalTags.forEach((tag: ITag) => {
        if (tag.isSetAsBacklogFilter === true) {
          task.tagIds.forEach(tagId => {
            if (tagId.id === tag.id) {
              includeTask = true
            }
          })
        }
      })
      return (includeTask)
    })
  }

  return selectedTasks;
}
