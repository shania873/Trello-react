import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { v4 as uuidv4 } from "uuid";
import CreateTask from "./create-task";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock("react-redux", () => ({
  connect: () => (component) => component,
}));

describe("Component Creation Task Showed", () => {
  it("renders without crashing", () => {
    render(<CreateTask />);
    const form = document.querySelectorAll(".form")[0];

    expect(form).toBeInTheDocument();
  });

  it("add a new task", () => {
    render(<CreateTask />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input.value).toBe("New Task");
  });
});
