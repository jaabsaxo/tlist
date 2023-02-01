import { useAppDispatch } from "../../hooks"
import { addOrUpdateGlobalTag, ITask, ITag, setActive, setInActive, addGlobalTagToTask } from "./trackingSlice";

interface TagProps {
  globalTag: ITag,
  taskId: string
}

const NewTag: React.FC<TagProps> = ({ globalTag, taskId }: TagProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(addGlobalTagToTask({ tagId: globalTag.id, taskId: taskId }));
  }
  return (
    <div>
      <button className="global-tag-button" onClick={onClick}>
        {globalTag.displayName}
      </button>
    </div>
  )
}

interface ListProps {
  globalTags: ITag[]
  taskId: string
}

const List: React.FC<ListProps> = ({ globalTags, taskId }: ListProps) => {
  if (globalTags) {
    if (globalTags.length > 0) {
      const items = globalTags.map((tag: ITag) => {
        return (
          <div key={tag.id}>
            <NewTag globalTag={tag} taskId={taskId} />
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

interface Props {
  task: ITask
  globalTags: ITag[]
}

const AvailableTags: React.FC<Props> = ({ globalTags, task }: Props) => {
  const dispatch = useAppDispatch();
  const onMouseEnter = () => {
    dispatch(setActive({ id: task.id }));
  }
  const onMouseLeave = () => {
    dispatch(setInActive({ id: task.id }));
  }
  return (
    <div>
      <p className="what-is-this-pointer">Available Tags</p>
      <div className="column"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="row">
          <List globalTags={globalTags} taskId={task.id} />
        </div>
      </div>
    </div>
  )
}

export default AvailableTags;