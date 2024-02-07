import React from "react";
import DashboardItemComponents from "../dashboard-item/dashboard-item-components";
const DashboardContainer = () => {
  return (
    <div>
      <DashboardItemComponents title={"TODO"} greedy={true} />
      <DashboardItemComponents title={"DOING"} greedy={true} />
      <DashboardItemComponents title={"DONE"} greedy={true} />
    </div>
  );
};

export default DashboardContainer;
