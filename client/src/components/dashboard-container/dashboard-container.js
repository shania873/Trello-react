import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
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
    </div>
  );
};

export default DashboardContainer;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    type: "section",
    drop(item) {
      addItemToSection(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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

  const addItemToSection = (id) => {
    setTasks((prev) => {
      console.log("prev", prev);
      const mTasks = prev.map((t) => {
        console.log(t);
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      toast("Status à changé");

      return mTasks;
    });
  };
  return (
    <div ref={drop} className={`${isOver ? "bg-primary" : "bg-dark"}`}>
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",

    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Col
      ref={drag}
      className={`column ${isDragging ? "bg-primary" : "bg-dark"}`}
    >
      <p>{task.name}</p>
    </Col>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div className=" d-flex header-dashboard">
      <h6>
        {text}
        {/* <div>{count}</div> */}
      </h6>
    </div>
  );
};
