import React from "react";
import { ReactComponent as PointerIcon } from "./aim.svg";

const Pointer = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) scale(0.07)"
      }}
    >
      <PointerIcon />
    </div>
  );
};
export default Pointer;
