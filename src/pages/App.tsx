import { Provider } from "react-redux";
import { store } from "../store";
import Board from "../components/Board/Board";
// import TaskBoard from "../components/TaskBoard/TaskBoard";

function App() {
  return (
    <Provider store={store}>
      <Board />
      {/* <TaskBoard /> */}
    </Provider>
  );
}

export default App;
