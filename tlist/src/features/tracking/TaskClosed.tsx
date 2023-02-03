import { useAppDispatch } from "../../hooks"
import StatusSwitch from "./statusSwitch";
import TimeOption from "./TimeOption";
import { ITask, ITag, updateText, openOrClose } from "./trackingSlice";
import CurrentTagsClosed from "./CurrentTagsClosed";
import ClockIcon from '../../assets/white-clock-25x25.png'

interface TimeTagProps {
  minutes: number
}

const TimeTag: React.FC<TimeTagProps> = ({ minutes }: TimeTagProps) => {
  return (
    <div className="time-tag row">
      <div className='icon-clock'>
        <img
          src={""}
          alt=""
        />
      </div>
      <div>
        {minutes} min
      </div>
    </div>
  )
}

interface IStatusEmoji {
  taskState: string
}

const StatusEmoji: React.FC<IStatusEmoji> = ({ taskState }: IStatusEmoji) => {
  if (taskState === "done") {
    return (
      <p>✔️</p>
    )
  } else {
    return (
      <>
      </>
    )
  }
}


interface Props {
  task: ITask
  globalTags: ITag[]
}

const TaskClosed: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const onChange = (event: any) => {
    dispatch(updateText({ text: String(event.target.value), id: task.id }));
  }
  const onClick = () => {
    dispatch(openOrClose({ id: task.id }));
  }

  return (
    <div className="task-card-closed" onClick={onClick}>
      <div className="row">
        <div>
          <input
            value={task.text}
            onChange={onChange}
            className={'description-text'}
          />
        </div>
        <div>
          <TimeTag minutes={task.duration} />
        </div>
        <div>
          <StatusEmoji taskState={task.taskState} />
        </div>
      </div>
      <CurrentTagsClosed task={task} />
      <div>
      </div>
    </div>
  )
}

export default TaskClosed