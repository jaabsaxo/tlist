import { useAppDispatch } from "../../hooks"
import { ITask, openOrClose, setTaskState, switchCompletionState } from "./trackingSlice";

interface ITaskStateButton {
  newTaskState: string
  isOn: boolean
  taskId: string
  text: string
}


const TaskStateButton: React.FC<ITaskStateButton> = ({ newTaskState, isOn, taskId, text }: ITaskStateButton) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setTaskState({ taskId: taskId, taskState: newTaskState }));
  }
  if (isOn) {
    return (
      <button className="complete-button-on" onClick={onClick}>
        {text}
      </button>
    )
  } else {
    return (
      <button className="complete-button-off" onClick={onClick}>
        {text}
      </button>
    )
  }
}

interface Props {
  task: ITask
}

const TaskState: React.FC<Props> = ({ task }: Props) => {
  return (
    <div className="row">
      <div style={{ margin: 5}}>
        <TaskStateButton
          text="Complete ✔️"
          isOn={(task.taskState === 'done')}
          newTaskState = 'done'
          taskId={task.id} />
      </div>
      <div style={{ margin: 5}}>
        <TaskStateButton
          text="Todo"
          isOn={(task.taskState === 'todo')}
          newTaskState = 'todo'
          taskId={task.id} />
      </div>
    </div>
  )
}

export default TaskState;