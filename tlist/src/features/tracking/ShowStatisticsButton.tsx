import { useEffect, useState } from 'react';
import DiagramIcon from '../../assets/diagram-25x25.png'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { setShowStatistics } from './trackingSlice';



const ShowStatisticsButton = () => {
  const dispatch = useAppDispatch();
  const showStatistics = useAppSelector((state: RootState) => state.tracking.showStatistics);

  const onClick = () => {
    if (showStatistics === false) {
      let left = document.getElementById("left")
      if (left) {
        left.style.width = "50%"
      }
      let right = document.getElementById("right")
      if (right) {
        right.style.width = "50%"
        right.style.display = "block"
      }
      dispatch(setShowStatistics({ showStatistics: true}));
    } else {
      let left = document.getElementById("left")
      if (left) {
        left.style.width = "100%"
      }
      let right = document.getElementById("right")
      if (right) {
        right.style.width = "0%"
        right.style.display = "none"
      }
      dispatch(setShowStatistics({ showStatistics: false}));
    }

  }

  return (
    <div>
      <div
        className="diagram-bg"
        onClick={onClick}
      >
        <img
          src={DiagramIcon}
          alt=""
        />
      </div>
      </div>
  )
}

export default ShowStatisticsButton;