import React, { useEffect, useState } from "react";
import DashboardContainer from "./components/dashboard-container/dashboard-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/App.scss";
import CreateTask from "./components/create-task/create-task";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getTasks"); // Remplacez l'URL par celle de votre serveur Node.js
        if (!response.ok) {
          throw new Error("La requête n'a pas abouti.");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
        <DashboardContainer tasks={tasks} setTasks={setTasks} />
      </DndProvider>
    </div>
  );
};

export default App;
