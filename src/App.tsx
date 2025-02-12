import "./App.css";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return <div className="App">{!user ? <Login /> : <TaskList />}</div>;
}

export default App;
