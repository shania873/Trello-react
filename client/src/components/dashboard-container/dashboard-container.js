import React from "react";
import DashboardItemComponents from "../dashboard-item/dashboard-item-components";
const DashboardContainer = () => {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: "Task 1", status: "todo" },
    { id: 2, text: "Task 2", status: "doing" },
    { id: 4, text: "Task 4", status: "done" },
    { id: 3, text: "Task 3", status: "done" },
    { id: 5, text: "Task 3", status: "done" },
  ]);
  return (
    <div>
      <DashboardItemComponents
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
        tasks={tasks.filter((task) => task.status === "done")}
      />
    </div>
  );
};

export default DashboardContainer;
