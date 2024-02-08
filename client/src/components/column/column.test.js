import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Column from "./column";

const mockStore = configureStore();

describe("Column Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasksReducer: {
        tasks: [],
        isLoading: false,
        error: null,
      },
    });
  });

  it("handles drop event correctly", async () => {
    const mockUpdateTask = jest.fn();
    const mockFetchTasks = jest.fn();

    const fakeTodos = [{ id: 1, name: "Task 1", status: "todo" }];
    const fakeInProgress = [{ id: 2, name: "Task 2", status: "inprogress" }];
    const fakeClosed = [{ id: 3, name: "Task 3", status: "closed" }];

    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Column
            status="todo"
            setTasks={() => {}}
            updateTask={mockUpdateTask}
            fetchTasks={mockFetchTasks}
            todos={fakeTodos}
            inProgress={fakeInProgress}
            closed={fakeClosed}
          />
        </DndProvider>
      </Provider>
    );

    await waitFor(() => {
      screen.getByTestId("task-element");
    });

    const taskElement = screen.getByTestId("task-element");
    expect(taskElement).toBeInTheDocument();
  });
});
