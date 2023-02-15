import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { getSelectedTasks } from '../../util';
import BarChart from './BarChart';
import { ITask, setShowStatistics } from './trackingSlice';
import { updateText, setActive, setInActive } from "./trackingSlice";


interface DescriptionProps {
  task: ITask
}


const Description: React.FC<DescriptionProps> = ({ task }: DescriptionProps) => {

  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const onChange = (event: any) => {
    dispatch(updateText({ text: String(event.target.value), id: task.id }));
  }
  const onMouseEnter = () => {
    dispatch(setActive({ id: task.id }));
  }
  const onMouseLeave = () => {
    dispatch(setInActive({ id: task.id }));
  }

  const onClick = () => {
    setExpanded(!expanded)
  }

  if (expanded) {
    return (
      <div>
        <p className="what-is-this-pointer">Description</p>
        <div className='row'>
          <div>
            <textarea
              value={task.text}
              onChange={onChange}
              className={'description-textarea'}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </div>
          <div>
            <button
              className='button-set-description-size'
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >📝
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p className="what-is-this-pointer">Description</p>
        <div className='row'>
          <div>
            <input
              value={task.text}
              onChange={onChange}
              className={'description-text'}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </div>
          <div>
            <button
              className='button-set-description-size'
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >📝
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default Description;