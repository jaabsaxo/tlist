import { useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { getSelectedTasks } from "../../util";
import TaskSwitch from "./TaskSwitch";
import { ITask, ITag } from "./trackingSlice";


interface Props {
  tasks: ITask[]
  globalTags: ITag[]
  backlogFilters: { displayName: string, isSet: boolean }[]
}


const List: React.FC<Props> = ({ tasks, globalTags, backlogFilters }: Props) => {
  if (tasks) {
    if (tasks.length > 0) {
      let selectedTasks = getSelectedTasks(tasks, globalTags, backlogFilters);
      const items = selectedTasks.map((t: ITask) => {
        return (
          <div key={t.id}>
            <TaskSwitch task={t} globalTags={globalTags} />
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
  const backlogFilters = useAppSelector((state: RootState) => state.tracking.backlogFilters);
  const globalTags = useAppSelector((state: RootState) => state.tracking.tags)
  return (
    <div>
      <List tasks={tasks} globalTags={globalTags} backlogFilters={backlogFilters} />
    </div>
  )
}

export default Backlog