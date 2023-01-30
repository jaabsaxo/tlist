import { useAppDispatch } from "../../hooks"
import { addBlankTag, ITask, updateTag, ITag, setActive, setInActive } from "./trackingSlice";

interface TagProps {
  tag: ITag,
  taskId: string
}

const Tag: React.FC<TagProps> = ({ tag, taskId }: TagProps) => {
  const dispatch = useAppDispatch();
  const onChange = (event: any) => {
    dispatch(updateTag({ value: String(event.target.value), tagId: tag.id, taskId: taskId }));
  }
  return (
    <div>
      <input className="tag" onChange={onChange} value={tag.value} />
    </div>)
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
            <Tag tag={tag} taskId={id} />
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

interface Props {
  task: ITask
}

const CurrentTags: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(addBlankTag({ id: task.id }));
  }
  const onMouseEnter = () => {
    dispatch(setActive({ id: task.id }));
  }
  const onMouseLeave = () => {
    dispatch(setInActive({ id: task.id }));
  }
  return (
    <div>
      <p className="what-is-this-pointer">Tags</p>
      <div 
        className="row"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        <div>
          <button
            onClick={onClick}
          >
            +
          </button>
        </div>
        <div>
          <List tags={task.tags} id={task.id} />
        </div>
      </div>
    </div>
  )
}

export default CurrentTags;