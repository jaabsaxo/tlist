import { useAppDispatch } from "../../hooks"
import { addGlobalTag, ITask, updateTag, ITag, setActive, setInActive } from "./trackingSlice";

interface TagProps {
  tag: ITag,
  taskId: string
}

const NewTag: React.FC<TagProps> = ({ tag, taskId }: TagProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(addGlobalTag({ tag: tag, taskId: taskId }));
  }
  return (
    <div>
      <button className="global-tag-button" onClick={onClick}>
        {tag.value}
      </button>
    </div>
  )
}

interface ListProps {
  tags: ITag[]
  id: string
}

const List: React.FC<ListProps> = ({ tags, id }: ListProps) => {
  if (tags) {
    if (tags.length > 0) {
      const items = tags.map((tag: ITag) => {
        return (
          <div key={tag.id}>
            <NewTag tag={tag} taskId={id} />
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

const NewTags: React.FC<Props> = ({ task, globalTags }: Props) => {
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
          <List tags={globalTags} id={task.id} />
        </div>
      </div>
    </div>
  )
}

export default NewTags;