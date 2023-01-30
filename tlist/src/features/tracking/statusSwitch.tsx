import { useAppDispatch } from "../../hooks"
import { openOrClose, switchCompletionState } from "./trackingSlice";

interface ICompleteButton {
  text: string
  isOn: boolean
  id: string
}


const CompleteButton: React.FC<ICompleteButton> = ({ text, isOn, id }: ICompleteButton) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(switchCompletionState({ id: id }));
  }
  if (isOn == true) {
    return (
      <button className="complete-button-on" onClick={onClick}>
        {text}
      </button>
    )
  } else {
    return (
      <button className="complete-button-off" onClick={onClick}>
        {text}
      </button>
    )
  }
}

interface Props {
  id: string;
  isComplete: boolean;
}

const StatusSwitch: React.FC<Props> = ({ id, isComplete }: Props) => {
  return (
    <div className="row">
      <div>
        <CompleteButton text="Complete ✔️" isOn={isComplete} id={id} />
      </div>
      <div>
        <CompleteButton text="Todo" isOn={!isComplete} id={id} />
      </div>
    </div>
  )
}

export default StatusSwitch;