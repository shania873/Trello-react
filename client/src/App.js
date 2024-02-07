import React, { useEffect, useState } from "react";
import DashboardContainer from "./components/dashboard-container/dashboard-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/App.scss";
import CreateTask from "./components/create-task/create-task";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  });
  return (
    <div className="App">
      <Toaster />
      <DndProvider backend={HTML5Backend}>
        <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
        <DashboardContainer tasks={tasks} setTasks={setTasks} />
      </DndProvider>
    </div>
  );
};

export default App;
