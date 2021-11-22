import React from "react";
import { ReactComponent as AddIcon } from "./add.svg";

const AddButton = ({ OnClick }) => {
  return (
    <div>
      <AddIcon
        style={{
          position: "fixed",
          left: "50%",
          top: "90%",
          transform: "translate(-50%, -50%) scale(0.15)",
          fill: "black"
        }}
        onClick={OnClick}
      />
    </div>
  );
};

export default AddButton;
