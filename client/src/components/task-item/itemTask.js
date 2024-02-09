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

  async function onClickDelete(task) {
    console.log(props.tasks.filter((e) => e.id !== task.id));
    await fetch(`http://localhost:3000/deleteTask/${task.id}`, {
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
        props.setTasks(data.list);
        localStorage.setItem("tasks", JSON.stringify(data.list));
        toast.success("Tache effacée");
      })
      .catch((error) => {
        console.log(error);
      });
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
