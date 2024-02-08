export const fetchTasks = (i) => {
  return (dispatch) => {
    console.log("kopkoretp^ktorpe^");
    fetch("http://localhost:3000/getTasks", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "FETCH_TASKS", payload: data });
        console.log(dispatch({ type: "FETCH_TASKS", payload: data }));
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_TASKS_FAILURE", error: error.message });
      });
  };
};
export const addTask = (task) => {
  return (dispatch) => {
    console.log(task);
    fetch(`http://localhost:3000/setTasks`, {
      method: "POST",
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        status: task.status,
      }),
      headers: {
        "Content-Type": "application/json",
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
        dispatch({ type: "ADD_TASKS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_CREDITS_FAILURE", error: error.message });
      });
  };
};
export const updateTask = (id, name, status) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/updateTasks`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        name: name,
        status: status,
      }),
      headers: {
        "Content-Type": "application/json",
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
        dispatch({ type: "ADD_TASKS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_CREDITS_FAILURE", error: error.message });
      });
  };
};
