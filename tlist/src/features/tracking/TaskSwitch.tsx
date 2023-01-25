import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import TimeOption from "./TimeOption";
import { Task, updateText } from "./trackingSlice";


interface Props {
  task: Task;
}

const TaskOpen: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const onChange = (event: any) => {
    dispatch(updateText({ text: String(event.target.value), id: task.id }));
  }

  return (
    <div className="task-outline">
      <p>Description</p>
      <textarea
        value={task.text}
        onChange={onChange}
      />
      <p>Time</p>
      <div className="column">
        <div className="row">
          <TimeOption minutes={5} id={task.id} duration={task.duration} />
          <TimeOption minutes={10} id={task.id} duration={task.duration} />
          <TimeOption minutes={15} id={task.id} duration={task.duration} />
          <TimeOption minutes={20} id={task.id} duration={task.duration} />
        </div>
        <div className="row">
          <TimeOption minutes={30} id={task.id} duration={task.duration} />
          <TimeOption minutes={40} id={task.id} duration={task.duration} />
          <TimeOption minutes={60} id={task.id} duration={task.duration} />
          <TimeOption minutes={120} id={task.id} duration={task.duration} />
        </div>
      </div>
    </div>
  )
}

const TaskClosed: React.FC<Props> = ({ task }: Props) => {
  return (
    <div className="task-outline">
      <p>Description</p>
      <p>{task.text}</p>
    </div>
  )
}


const TaskSwitch: React.FC<Props> = ({ task }: Props) => {
  if (task.state === 'closed') {
    return (
      <TaskClosed task={task} />
    )
  } else {
    return (
      <TaskOpen task={task} />
    )
  }
}


export default TaskSwitch