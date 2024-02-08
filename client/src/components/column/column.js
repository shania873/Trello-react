import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
import Header from "../header-column/header-column";
import Task from "../task-item/itemTask";
const Column = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    type: "section",
    drop(item, prev) {
      console.log(item, prev);
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
    let statusChanged = false;
    setTasks((prev) => {
      const mTasks = prev.map((task) => {
        if (task.status === "todo" && status === "closed") {
          return task;
        }
        if (task.id === id) {
          toast("Status à changé");

          fetch("http://localhost:3000/updateTasks", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              name: task.name,
              status: status,
            }),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });

          return { ...task, status: status };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      return mTasks;
    });
  };
  return (
    <div
      ref={drop}
      className={`${status} ${isOver ? "bg-primary" : "bg-dark"}`}
    >
      <Header text={text} bg={bg} count={todos?.length} />
      {tasksToMap &&
        tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task.id}
            task={task}
            setTasks={setTasks}
            className={"tkorpektopre"}
          />
        ))}
    </div>
  );
};

export default Column;
