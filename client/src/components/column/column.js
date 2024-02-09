import React from "react";
import { toast } from "react-hot-toast";

import { useDrop } from "react-dnd";
import Header from "../header-column/header-column";
import Task from "../task-item/itemTask";
import { connect } from "react-redux";
import { updateTask, fetchTasks } from "../../store/actions/tasksAction";

const Column = (props) => {
  const { updateTask, tasks } = props;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    type: "section",
    drop(item, prev) {
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

  const addItemToSection = async (id) => {
    props.setTasks((prev) => {
      const mTasks = prev.map((task) => {
        if (
          (task.status === "todo" && props.status === "closed") ||
          (task.status === "closed" && props.status === "todo")
        ) {
          return task;
        }
        if (task.id === id) {
          toast("Status à changé");
          updateTask(id, task.name, props.status);

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
      data-testid="column-container"
      className={`column ${props.status} ${isOver ? "bg-primary" : "bg-dark"}`}
    >
      <Header text={text} bg={bg} count={props.todos?.length} />
      {tasksToMap &&
        tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task.id}
            data-testid="task-element"
            task={task}
            tasksToMap={tasksToMap}
            tasks={tasks}
            setTasks={props.setTasks}
            className={"task"}
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
