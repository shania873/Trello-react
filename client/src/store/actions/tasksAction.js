export const addTask = (task) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/setTasks`, {
        method: "POST",
        body: JSON.stringify({
          id: task.id,
          name: task.name,
          status: task.status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch({ type: "ADD_TASKS", payload: data });

      dispatch(fetchTasks());
    } catch (error) {
      dispatch({ type: "ADD_TASKS_FAILURE", error: error.message });
    }
  };
};

export const updateTask = (id, name, status) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/updateTasks`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
          status: status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch({ type: "UPDATE_TASKS", payload: data });

      dispatch(fetchTasks());
    } catch (error) {
      dispatch({ type: "UPDATE_TASKS_FAILURE", error: error.message });
    }
  };
};

export const fetchTasks = (i) => {
  return async (dispatch) => {
    await fetch("http://localhost:3000/getTasks", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "FETCH_TASKS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_TASKS_FAILURE", error: error.message });
      });
  };
};
