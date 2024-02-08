import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import { useDrop } from "react-dnd";
import Header from "../header-column/header-column";
import Task from "../task-item/itemTask";
import { connect } from "react-redux";
import { updateTask, fetchTasks } from "../../store/actions/tasksAction";
const Column = (props) => {
  const { updateTask, fetchTasks } = props;
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
  let tasksToMap = props.todos;

  if (props.status === "inprogress") {
    text = "In Progress";
    bg = "bg-white";
    tasksToMap = props.inProgress;
  }

  if (props.status === "closed") {
    text = "Closed";
    bg = "bg-red";
    tasksToMap = props.closed;
  }

  const addItemToSection = (id) => {
    let statusChanged = false;
    props.setTasks((prev) => {
      const mTasks = prev.map((task) => {
        if (task.status === "todo" && props.status === "closed") {
          return task;
        }
        if (task.id === id) {
          toast("Status à changé");

          fetch("http://localhost:3000/updateTasks", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              name: task.name,
              status: props.status,
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

          return { ...task, status: props.status };
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
      className={`${props.status} ${isOver ? "bg-primary" : "bg-dark"}`}
    >
      <Header text={text} bg={bg} count={props.todos?.length} />
      {tasksToMap &&
        tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task.id}
            task={task}
            setTasks={props.setTasks}
            className={"tkorpektopre"}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasksReducer.tasks,
  isLoading: state.tasksReducer.isLoading,
  error: state.tasksReducer.error,
});

export default connect(mapStateToProps, { updateTask, fetchTasks })(Column);
