let initialState = {
  tasks: [""],
  isLoading: false,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASKS":
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_TASKS":
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_TASKS":
      return {
        ...state,
        tasks: [],
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_TASKS":
      return {
        ...state,
        task: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_TASKS_FAILURE":
      return {
        ...state,
        task: action.payload,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default tasksReducer;
