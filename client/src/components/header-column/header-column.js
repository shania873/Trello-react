import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";

const Header = ({ text, bg, count }) => {
  return (
    <div className="d-flex header-dashboard">
      <h6>{text}</h6>
    </div>
  );
};

export default Header;
