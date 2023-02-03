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
            backgroundColor: "#646CFF",
            margin: 2,
          }}
        >
          <div className="row">
            <div>
              {minutes}
            </div>
          </div>
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          onClick={onClick}
          style={{
            margin: 2,
          }}
        >
          {minutes}
        </button>
      </div>
    )
  }
}

export default TimeOption;