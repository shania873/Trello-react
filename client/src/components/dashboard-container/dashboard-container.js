import React, { useState, useEffect } from "react";
import DashboardItemComponents from "../dashboard-item/dashboard-item-components";

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
  }, [tasks.length]);

  const statuses = ["todo", "inprogress", "closed"];
  return (
    <div>
      <div className="d-flex">
        {statuses.map((status, index) => (
          <Section
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

      {/* <DashboardItemComponents
        title={"TODO"}
        greedy={true}
        tasks={tasks.filter((task) => task.status === "todo")}
      />
      <DashboardItemComponents
        title={"DOING"}
        greedy={true}
        tasks={tasks.filter((task) => task.status === "doing")}
      />
      <DashboardItemComponents
        title={"DONE"}
        greedy={true}
        tasks={tasks.filter((task) => task.status === "done")}gv '
      /> */}
    </div>
  );
};

export default DashboardContainer;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  let text = "Todo";
  let bg = "bg-dark";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-white";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Closed";
    bg = "bg-red";
    tasksToMap = closed;
  }

  return (
    <div>
      <Header text={text} bg={bg} count={todos?.length} />
      {tasksToMap &&
        tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  return (
    <div>
      <p>{task.name}</p>
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div className=" d-flex">
      {text} <div>{count}</div>
    </div>
  );
};
