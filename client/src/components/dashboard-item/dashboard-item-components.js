import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";

import Card from "react-bootstrap/Card";
import { ItemTypes } from "../../ItemTypes";
function getStyle(backgroundColor) {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
    minHeight: "8rem",
    minWidth: "8rem",
    color: "white",
    backgroundColor,
    padding: "2rem",
    paddingTop: "1rem",
    margin: "1rem",
    textAlign: "center",
    float: "left",
    fontSize: "1rem",
  };
}
const style = {
  display: "inline-block",
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  color: "black",
  cursor: "move",
};
const DashboardItemColumn = ({ title, greedy, tasks }) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const text = greedy ? "greedy" : "not greedy";
  let backgroundColor = "rgba(0, 0, 0, .5)";
  const [, drag] = useDrag(() => ({ type: ItemTypes.BOX }));

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  );

  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = "darkgreen";
  }

  return (
    <div className="column" ref={drop} style={getStyle(backgroundColor)}>
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div
            className="item-task"
            ref={drag}
            style={style}
            key={index}
            draggable
            onDragOver={(event) => event.preventDefault()}
          >
            {console.log(index)}
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardItemColumn;
