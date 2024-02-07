import React from "react";
import DashboardContainer from "./components/dashboard-container/dashboard-container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <DashboardContainer />
      </DndProvider>
    </div>
  );
};

export default App;
