import React from "react";

const Header = ({ text }) => {
  return (
    <div className="d-flex header-dashboard">
      <h6>{text}</h6>
    </div>
  );
};

export default Header;
