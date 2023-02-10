import DiagramIcon from '../../assets/diagram-25x25.png'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { setShowStatistics } from './trackingSlice';

const StatisticsClosed = () => {
  const dispatch = useAppDispatch();
  const showStatistics = useAppSelector((state: RootState) => state.tracking.showStatistics);

  const onClick = () => {
    dispatch(setShowStatistics({ showStatistics: !showStatistics}));
  }

  return (
    <div>
      <div className='statistics-body'>
        <div></div>
      </div>
    </div>
  )
}

export default StatisticsClosed;