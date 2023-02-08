import { useAppDispatch, useAppSelector } from "../../hooks"
import { RootState } from "../../store";
import { ITag, toggleBacklogFilter, toggleBackLogTagFilter, newEmptyTask } from "./trackingSlice";


interface ITagFilterProps {
  displayName: string
  tagId: string
  isSet: boolean
}

const TagFilter: React.FC<ITagFilterProps> = ({ tagId, displayName, isSet }: ITagFilterProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(toggleBackLogTagFilter({ id: tagId }));
  }
  if (isSet) {
    return (
      <div onClick={onClick} className="top-filter tag-filter-on">
        {displayName}
      </div>
    )
  } else {
    return (
      <div onClick={onClick} className="top-filter tag-filter-off">
        {displayName}
      </div>
    )
  }
}


interface IGlobalTagFiltersProps {
  globalTags: ITag[]
}

const GlobalTagFilters: React.FC<IGlobalTagFiltersProps> = ({ globalTags }: IGlobalTagFiltersProps) => {
  if (globalTags) {
    if (globalTags.length > 0) {
      const items = globalTags.map((tag: ITag) => {
        return (
          <div key={tag.id}>
            <TagFilter displayName={tag.displayName} tagId={tag.id} isSet={tag.isSetAsBacklogFilter} />
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
      <div onClick={onClick} className="top-filter filter-on">
        {displayName}
      </div>
    )
  } else {
    return (
      <div onClick={onClick} className="top-filter filter-off">
        {displayName}
      </div>
    )
  }
}


function TagFilterSection() {
  const backlogFilters = useAppSelector((state: RootState) => state.tracking.backlogFilters);
  const globalTags = useAppSelector((state: RootState) => state.tracking.tags)
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(newEmptyTask());
  }
  return (
    <div>
      <h3>Backlog</h3>
      <div className="row">
        <div>
          <button onClick={onClick}>+</button>
        </div>
        <div className="row">
          <BackLogFilters backlogFilters={backlogFilters} />
        </div>
        <div className="row">
          <GlobalTagFilters globalTags={globalTags} />
        </div>
      </div>
    </div>
  )
}

export default TagFilterSection