import React from "react";
import { useDrag } from "react-dnd";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";

const Task = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",

    item: { id: props.task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function onClickDelete(task) {
    // const updatedTasks = props.tasks.filter((t) => t.id !== task.id);
    // props.setTasks(updatedTasks);
    // toast("Task effacé");
    // localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    fetch(`http://localhost:3000/deleteTask/${task.id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // props.setTasks(data);
        console.log(data);
      })
      .catch((error) => {});
  }
  return (
    <Col
      ref={drag}
      className={`task-element ${isDragging ? "bg-primary" : "bg-dark"}`}
      data-testid="task-element"
    >
      <p>{props.task.name}</p>{" "}
      <button onClick={(e) => onClickDelete(props.task)}> - </button>
    </Col>
  );
};

export default Task;
