import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { addBlankTag, ITask, updateTag, ITag } from "./trackingSlice";

interface TagProps {
  displayName: string
}

const Tag: React.FC<TagProps> = ({ displayName }: TagProps) => {
  return (
    <div>
      <input className="tag-closed" value={displayName} />
    </div>)
}

interface ListProps {
  tags: ITag[]
}

const List: React.FC<ListProps> = ({ tags }: ListProps) => {
  if (tags) {
    if (tags.length > 0) {
      const items = tags.map((tag: ITag) => {
        return (
          <div key={tag.id}>
            <Tag displayName={tag.displayName} />
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
  const globalTags = useAppSelector((state: RootState) => state.tracking.tags);
  let tags = task.tagIds.map( tagId => {
    let tag = globalTags.filter(t => {
      return (tagId.id == t.id) 
    })
    return tag[0]
  })
  return (
    <div>
      <div className="row">
        <div>
          <List tags={tags} />
        </div>
      </div>
    </div>
  )
}

export default CurrentTags;