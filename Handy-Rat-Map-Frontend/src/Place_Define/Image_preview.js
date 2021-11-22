import React, { useState } from "react";

const Images_preview = ({ ImageSrc, OnClick }) => {
  let Left = 0;

  if (ImageSrc === null || ImageSrc === undefined) {
    return <div></div>;
  }

  const Images_Show = ImageSrc.map((Element, index) => {
    if (index <= 5) {
      return <img className="ui small image" key={index} src={Element} />;
    } else {
      Left = Math.ceil(Left + 1);
      return <div></div>;
    }
  });

  if (Left === 0) {
    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={OnClick}
        className="ui mini images"
      >
        {Images_Show}
      </div>
    );
  } else {
    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={OnClick}
        className="ui mini images"
      >
        {Images_Show}
      </div>
    );
  }

  // return <div></div>;
};

export default Images_preview;
