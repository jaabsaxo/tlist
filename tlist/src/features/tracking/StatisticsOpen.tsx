import ApexCharts from 'apexcharts';
import DiagramIcon from '../../assets/diagram-25x25.png'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { getSelectedTasks } from '../../util';
import PieChart from './PieChart';
import { setShowStatistics } from './trackingSlice';

const StatisticsOpen = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tracking.tasks);
  const backlogFilters = useAppSelector((state: RootState) => state.tracking.backlogFilters);
  const globalTags = useAppSelector((state: RootState) => state.tracking.tags);
  let selectedTasks = getSelectedTasks(tasks, globalTags, backlogFilters);

  const showStatistics = useAppSelector((state: RootState) => state.tracking.showStatistics);
  const onClick = () => {
    dispatch(setShowStatistics({ showStatistics: !showStatistics}));
  }

  let totalMinutes = 0;
  selectedTasks.forEach(task => {
    totalMinutes = totalMinutes + task.duration;
  })

  return (
    <div>
      <div className='statistics-body'>
        <div>
          <p>Total load: {Math.round(totalMinutes*100/60)/100} hours ({totalMinutes}min) </p>
          <PieChart tasks ={selectedTasks}  globalTags = {globalTags}/>
        </div>
      </div>
    </div>
  )
}

export default StatisticsOpen;