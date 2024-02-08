import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
import Column from "../column/column";
const DashboardContainer = ({ tasks, setTasks }) => {
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fTodos = tasks?.filter((task) => task.status === "todo");
    const fInProgress = tasks?.filter((task) => task.status === "inprogress");
    const fClosed = tasks?.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];
  return (
    <div>
      <div className="d-flex">
        {statuses.map((status, index) => (
          <Column
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardContainer;
