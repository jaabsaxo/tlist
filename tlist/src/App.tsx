import Backlog from "./features/tracking/Backlog"
import Statistics from "./features/tracking/StatisticsSwitch"
import TagFilterSection from "./features/tracking/TagFilterSection"
import { loadStateFromLocalStorage } from "./features/tracking/trackingSlice";
import { useAppDispatch } from "./hooks";

function App() {

  const dispatch = useAppDispatch();
  setTimeout(() => {
    dispatch(loadStateFromLocalStorage());
  }, 10)

  return (
    <div className="app">
      <div>
        <h1>/T?list/</h1>
      </div>
      <div>
        <TagFilterSection />
      </div>
      <div className="main">
        <div className="left" id="left">
          <Backlog />
        </div>
        <div className="right" id="right">
          <Statistics />
        </div>
      </div>
    </div>
  )
}

export default App
