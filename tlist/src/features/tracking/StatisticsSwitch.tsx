import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import StatisticsClosed from './StatisticsClosed';
import StatisticsOpen from './StatisticsOpen';

const StatisticsSwitch = () => {
  const showStatistics = useAppSelector((state: RootState) => state.tracking.showStatistics);

  if (showStatistics) {
    return (
      <>
        <StatisticsOpen />
      </>
    )
  } else {
    return (
      <>
        <StatisticsClosed />
      </>
    )
  } 
}

export default StatisticsSwitch;