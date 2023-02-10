import DiagramIcon from '../../assets/diagram-25x25.png'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { ITag, ITask, setShowStatistics } from './trackingSlice';

import Chart from 'react-apexcharts'
import { Component } from 'react';

interface IPieChart {
  tasks: ITask[]
  globalTags: ITag[]
}

const PieChart: React.FC<IPieChart>  = ({ tasks, globalTags }: IPieChart) => {

  let series: number[] = []
  let labels: any = []


  if (tasks) {
    if (tasks.length > 0) {
      let MapTagToDuration: any = {}
      tasks.forEach(task => {
        task.tagIds.forEach(taskTagId => {
          if (MapTagToDuration[taskTagId.id]) {
            MapTagToDuration[taskTagId.id] += Number(task.duration)
          } else {
            MapTagToDuration[taskTagId.id] = Number(task.duration)
          }
        })
      })

      Object.keys(MapTagToDuration).forEach(tagId => {
        series.push(MapTagToDuration[tagId])
        if (globalTags) {
          if (globalTags.length > 0) {
            globalTags.forEach(tag => {
              if (tag.id === tagId) {
                labels.push(tag.displayName)
              }
            })
          }
        }
      });
    }
  }

  let options = {
    labels: labels, 
    colors:['#008055']
  }

  return (
    <div>
      <Chart options={options} series={series} type="donut" width={500} height={320} />
    </div>
  )
}

export default PieChart;