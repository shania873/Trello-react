import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  console.log(task);

  const handleSubmit = (e) => {
    e.prevenDefault();
    if (task.name.length < 3) return toast.error("Tu dois mettre un task !");

    setTasks((prev) => {
      const list = [...prev, task];
      console.log(list);
      //   localStorage.setItem("tasks", JSON.stringify(list));

      //   return list;
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
      <button>Create</button>
    </form>
  );
};

export default CreateTask;
