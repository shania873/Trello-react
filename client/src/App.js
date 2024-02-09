import React, { useEffect, useState } from "react";
import DashboardContainer from "./components/dashboard-container/dashboard-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/App.scss";
import CreateTask from "./components/create-task/create-task";
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { fetchTasks } from "./store/actions/tasksAction";

const App = (props) => {
  const { fetchTasks } = props;
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getTasks");
        if (!response.ok) {
          throw new Error("La requête n'a pas abouti.");
        }
        const data = await response.json();
        setTasks(data);
        fetchTasks();
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, [fetchTasks]);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <DashboardContainer tasks={tasks} setTasks={setTasks} />
      </DndProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasksReducer.tasks,
  isLoading: state.tasksReducer.isLoading,
  error: state.tasksReducer.error,
});

export default connect(mapStateToProps, { fetchTasks })(App);
