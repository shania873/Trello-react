import React, { useEffect } from "react";
import DashboardContainer from "./components/dashboard-container/dashboard-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/App.scss";
import CreateTask from "./components/create-task/create-task";
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { fetchTasks } from "./store/actions/tasksAction";

const App = (props) => {
  const { fetchTasks, tasks, isLoading, error } = props;

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <CreateTask tasks={tasks} />
        <DashboardContainer tasks={tasks} />
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
