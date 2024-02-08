import React from "react";
import { useDrag } from "react-dnd";
import Col from "react-bootstrap/Col";

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
      data-testid="task-element"
    >
      <p>{task.name}</p>
    </Col>
  );
};

export default Task;
