import { useAppDispatch } from "../../hooks"
import { switchStatus } from "./trackingSlice";

interface Props {
  id: string;
  cardState: string;
}

const StatusSwitch: React.FC<Props> = ({ id, cardState }: Props) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(switchStatus({ id: id }));
  }
  if (cardState === "open") {
    return (
      <div>
        <button
          onClick={onClick}
          
        >
          Complete ✔️
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          onClick={onClick}
        >
          Re-open
        </button>
      </div>
    )
  }
}

export default StatusSwitch;