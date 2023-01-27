import TaskClosed from "./TaskClosed";
import TaskOpen from "./TaskOpen";
import { ITask, ITag } from "./trackingSlice";


interface Props {
  task: ITask
  globalTags: ITag[]
}

const TaskSwitch: React.FC<Props> = ({ task, globalTags }: Props) => {
  if (task.cardState === 'closed') {
    return (
      <TaskClosed task={task} />
    )
  } else {
    return (
      <TaskOpen task={task} globalTags={globalTags} />
    )
  }
}

export default TaskSwitch