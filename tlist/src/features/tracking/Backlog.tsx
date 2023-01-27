import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import TaskSwitch from "./TaskSwitch";
import { ITask, ITag, toggleBacklogFilter } from "./trackingSlice";


interface Props {
  tasks: ITask[]
  globalTags: ITag[]
  backlogFilters: { displayName: string, isSet: boolean }[]
}


const List: React.FC<Props> = ({ tasks, globalTags, backlogFilters }: Props) => {
  if (tasks) {
    if (tasks.length > 0) {
      let filtersThatAreOn: string[] = []
      backlogFilters.forEach((f) => {
        if (f.isSet) {
          filtersThatAreOn.push(f.displayName)
        }
      })
      const items = tasks.filter((t: ITask) => {
        return filtersThatAreOn.includes(t.taskState)
      }).map((t: ITask) => {
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

interface IBackLogFiltersProps {
  backlogFilters: {
    displayName: string
    isSet: boolean
  }[]
}

const BackLogFilters: React.FC<IBackLogFiltersProps> = ({ backlogFilters }: IBackLogFiltersProps) => {
  if (backlogFilters) {
    if (backlogFilters.length > 0) {
      const items = backlogFilters.map((f: { displayName: string, isSet: boolean }) => {
        return (
          <div key={f.displayName}>
            <BackLogFilter displayName={f.displayName} isSet={f.isSet} />
          </div>)
      });
      return (
        <>
          <div className="row">
            {items}
          </div>
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


interface IBackLogFilterProps {
  displayName: string
  isSet: boolean
}


const BackLogFilter: React.FC<IBackLogFilterProps> = ({ displayName, isSet }: IBackLogFilterProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(toggleBacklogFilter({ displayName: displayName }));
  }
  if (isSet) {
    return (
      <div onClick={onClick} className="filter-on">
        {displayName}
      </div>
    )
  } else {
    return (
      <div onClick={onClick} className="filter-off">
        {displayName}
      </div>
    )
  }

}


function Backlog() {
  const tasks = useAppSelector((state: RootState) => state.tracking.tasks);
  const backlogFilters = useAppSelector((state: RootState) => state.tracking.backlogFilters);
  const globalTags = useAppSelector((state: RootState) => state.tracking.tags)
  return (
    <div>
      <h3>Backlog</h3>
      <BackLogFilters backlogFilters={backlogFilters} />
      <List tasks={tasks} globalTags={globalTags} backlogFilters={backlogFilters} />
    </div>
  )
}

export default Backlog