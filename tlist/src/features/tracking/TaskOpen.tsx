import { useAppDispatch } from "../../hooks"
import StatusSwitch from "./statusSwitch";
import TimeOption from "./TimeOption";
import { ITask, ITag, updateText, switchStatus } from "./trackingSlice";
import CurrentTags from "./CurrentTags";
import NewTags from "./NewTags";


interface Props {
  task: ITask
  globalTags: ITag[]
}

const TaskOpen: React.FC<Props> = ({ task, globalTags }: Props) => {
  const dispatch = useAppDispatch();
  const onChange = (event: any) => {
    dispatch(updateText({ text: String(event.target.value), id: task.id }));
  }
  const onClick = () => {
    dispatch(switchStatus({ id: task.id }));
  }

  return (
    <div className="task-card" onClick={onClick}>
      <p className="what-is-this-pointer">Description</p>
      <input
        value={task.text}
        onChange={onChange}
        className={'description-text'}
      />
      <CurrentTags task={task} />
      <NewTags task={task} globalTags={globalTags}/>
      <p className="what-is-this-pointer">Time</p>
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
      <div>
        <p className="what-is-this-pointer">Status</p>
        <div className="row">
          <StatusSwitch id={task.id} cardState={task.cardState}  />
        </div>
      </div>
    </div>
  )
}

export default TaskOpen