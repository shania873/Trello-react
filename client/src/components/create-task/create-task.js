import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  console.log(tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length < 3) return toast.error("Tu dois mettre un task !");

    setTasks((prev) => {
      console.log(prev);
      const list = prev ? [...prev, task] : [task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    fetch("http://localhost:3000/setTasks", {
      method: "POST",
      //   id, name, status
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        status: task.status,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors here
      });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTask;
