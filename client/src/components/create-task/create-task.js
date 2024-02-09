import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { addTask, fetchTasks } from "../../store/actions/tasksAction";

const CreateTask = (props) => {
  const { addTask } = props;
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.name.length < 3) return toast.error("Tu dois mettre un task !");

    props.setTasks((prev) => {
      const list = prev ? [...prev, task] : [task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    addTask(task);
    toast.success("Tache crée");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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

const mapStateToProps = (state) => ({
  tasks: state.tasksReducer.tasks,
  isLoading: state.tasksReducer.isLoading,
  error: state.tasksReducer.error,
});

export default connect(mapStateToProps, { addTask, fetchTasks })(CreateTask);
