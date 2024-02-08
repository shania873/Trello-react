import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";

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

export default Task;
