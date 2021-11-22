import React from "react";
import { Transition } from "semantic-ui-react";
import "./ImageEdit.css";

const ImageEdit = ({ Visible, ImageSrc, OnDelete, OnClosed }) => {
  const ImagesShow = ImageSrc.map((Element, index) => {
    return (
      <div
        key={index}
        style={{ gridAutoColumns: "auto", gridAutoRows: "auto" }}
      >
        <i
          style={{ zIndex: "10000", position: "relative", top: "16%", left: "88%" }}
          className="close icon"
          onClick={() => {
            OnDelete(index);
          }}
        ></i>
        <img key={index} className="ui fluid image" src={Element} />
      </div>
    );
  });

  return (
    <Transition visible={Visible} animation="scale" duration={500}>
      <div
        className="ui segment"
        style={{
          zIndex: "2",
          position: "fixed",

          top: "5%",
          bottom: "5%",

          left: "5%",
          right: "5%"
        }}
      >
        <div className="image-list">{ImagesShow}</div>
        <button
          style={{ position: "absolute", right: "2.5%", bottom: "2.5%" }}
          class="ui icon button"
          onClick={OnClosed}
        >
          <i class="edit icon"></i>
          Finish Edit
        </button>
      </div>
    </Transition>
  );
};

export default ImageEdit;
