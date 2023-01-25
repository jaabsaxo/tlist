import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import TaskSwitch from "./TaskSwitch";
import { Task } from "./trackingSlice";


interface Props {
  tasks: Task[];
}

const List: React.FC<Props> = ({ tasks }: Props) => {
  if (tasks) {
    if (tasks.length > 0) {
      const items = tasks.map((t: Task) => {
        return (
          <div key={t.id}>
            <TaskSwitch task={t}/>
          </div>)
      });
      return (
        <>
          {items}
        </>
      )
    } else {
      return (
        <></>
      )
    }
  } else {
    return (
      <></>
    )
  }
}

function Backlog() {
  const tasks = useAppSelector((state: RootState) => state.tracking.tasks);
  return (
    <div>
      <List tasks={tasks} />
    </div>
  )
}

export default Backlog