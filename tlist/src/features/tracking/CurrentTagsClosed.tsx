import { useAppDispatch } from "../../hooks"
import { addBlankTag, ITask, updateTag, ITag } from "./trackingSlice";

interface TagProps {
  tag: ITag,
  taskId: string
}

const Tag: React.FC<TagProps> = ({ tag }: TagProps) => {
  return (
    <div>
      <input className="tag-closed" value={tag.value} />
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
  return (
    <div>
      <div className="row">
        <div>
          <List tags={task.tags} id={task.id} />
        </div>
      </div>
    </div>
  )
}

export default CurrentTags;