import { ITag, ITask } from './trackingSlice';

import Chart from 'react-apexcharts'
import { getDateFromTimeStamp } from '../../util';

interface IBarChart {
  tasks: ITask[]
}

const BarChart: React.FC<IBarChart> = ({ tasks }: IBarChart) => {

  function addToMap(MapTimeToDuration: any, date: string, duration: number) {
    if (Object.keys(MapTimeToDuration).includes(date)) {
      MapTimeToDuration[date] += duration
    } else {
      MapTimeToDuration[date] = duration
    }
  }

  if (tasks) {
    if (tasks.length > 0) {
      let MapTimeToDuration: any = {}
      tasks.forEach(task => {
        if (task.taskState === "done") {
          if (task.timeCompleted) {
            addToMap(MapTimeToDuration, getDateFromTimeStamp(task.timeCompleted), task.duration)
          }
        }
      })
      let categories: string[] = Object.keys(MapTimeToDuration)
      let data = Object.keys(MapTimeToDuration).map(key => {
        return MapTimeToDuration[key]
      })
      let options = {
        colors: ['#008055'],
        xaxis: {
          categories: categories.reverse()
        }
      }
      let series = [
        {
          name: "All",
          data: data.reverse()
        }
      ]
      return (
        <div>
          <p>Effort completed (min)</p>
          <Chart options={options} series={series} type="bar" width={500} height={320} />
        </div>
      )
    } else {
      return (
        <div>
          <p>Effort completed (min)</p>
          <p>No data selected..</p>
        </div>)
    }
  } else {
    return (
      <div>
        <p>Effort completed (min)</p>
        <p>No data selected..</p>
      </div>)
  }
}

export default BarChart;