import { useAppDispatch } from "../../hooks"
import { useTimeOption } from "./trackingSlice";

interface Props {
  minutes: number;
  id: string;
  duration: number;
}

const TimeOption: React.FC<Props> = ({ minutes, id, duration }: Props) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(useTimeOption({ duration: minutes, id: id }));
  }

  if (minutes === duration) {
    return (
      <div>
        <button
          onClick={onClick}
          style={{ 
            borderColor: "#fff",
            backgroundColor: "#646CFF"
           }}
        >
          {minutes}
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          onClick={onClick}
        >
          {minutes}
        </button>
      </div>
    )
  }
}

export default TimeOption;