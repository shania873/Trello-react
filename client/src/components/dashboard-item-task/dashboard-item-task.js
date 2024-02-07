import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
const style = {
  display: "inline-block",
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  color: "black",
  cursor: "move",
};
const DashboardItemTask = () => {
  const [, drag] = useDrag(() => ({ type: ItemTypes.BOX }));
  return (
    <div className="item-task" ref={drag} style={style}>
      Task content
    </div>
  );
};

export default DashboardItemTask;
