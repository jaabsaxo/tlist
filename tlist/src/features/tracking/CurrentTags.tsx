import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { getUuid } from "../../util";
import { ITask, setActive, setInActive, addGlobalTagToTask, addOrUpdateGlobalTag, removeTagFromTask } from "./trackingSlice";

interface TagProps {
  tagId: string,
  taskId: string
}

const Tag: React.FC<TagProps> = ({ tagId, taskId }: TagProps) => {
  const globalTags = useAppSelector((state: RootState) => state.tracking.tags);
  let displayName;
  globalTags.forEach(tag => {
    if (tag.id === tagId) {
      displayName = tag.displayName
      console.log("Match on:", tagId)
    }
  })
  const dispatch = useAppDispatch();
  const onChange = (event: any) => {
    let newValue = String(event.target.value)
    if (newValue === "") {
      dispatch(removeTagFromTask({ tagId: tagId, taskId}));
    } else {
      dispatch(addOrUpdateGlobalTag({ displayName: String(event.target.value), id: tagId, isSetAsBacklogFilter: true }));
    }
  }
  if (displayName) {
    return (
      <div>
        <input className="tag" onChange={onChange} value={displayName} />
      </div>
    )
  } else {
    return (<></>)
  }
  
}

interface ListProps {
  tagsIds: { id: string }[]
  taskId: string
}

const List: React.FC<ListProps> = ({ tagsIds, taskId }: ListProps) => {
  console.log("tagsIds", tagsIds)
  if (tagsIds) {
    if (tagsIds.length > 0) {
      const items = tagsIds.map((tagId: { id: string }) => {
        return (
          <div key={tagId.id}>
            <Tag tagId={tagId.id} taskId={taskId} />
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

interface ICurrentTagsProps {
  task: ITask
}

const CurrentTags: React.FC<ICurrentTagsProps> = ({ task }: ICurrentTagsProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    let tagId = getUuid()
    dispatch(addOrUpdateGlobalTag({ id: tagId, displayName: "A", isSetAsBacklogFilter: true }));
    dispatch(addGlobalTagToTask({ tagId: tagId, taskId: task.id }));
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
          <List tagsIds={task.tagIds} taskId={task.id} />
        </div>
      </div>
    </div>
  )
}

export default CurrentTags;