import React, { useEffect, useState } from "react";
import Images_preview from "./Image_preview";
import ImageEdit from "./ImageEdit.js";

const ImageSelector = ({ Value, onChange, OnImageDelete }) => {
  const [ImageEditVisibility, setImageEditVisibility] = useState(false);

  const OnImageInputChange = () => {
    const fileSelector = document.getElementById("fileSelector");
    const Images = fileSelector.files;
    let ImageBaseResult = Value;
    for (let i = 0; i < Images.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(Images[i]);
      reader.onload = function() {
        ImageBaseResult.push(reader.result);
      };
    }
    onChange(ImageBaseResult);
  };

  const OnImageClicked = () => {
    setImageEditVisibility(true);
  };

  const OnImageEditClosed = () => {
    setImageEditVisibility(false);
  };

  return (
    <div className="two column row">
      <div className="eight wide column">
        <Images_preview OnClick={OnImageClicked} ImageSrc={Value} />
      </div>
      <div className="eight wide column">
        <label for="fileSelector" className="fluid ui small button">
          <input
            type="file"
            id="fileSelector"
            className="fileSelector"
            data-target="file-uploader"
            accept="image/*"
            multiple
            onChange={OnImageInputChange}
          />
          <i className="fluid images icon"></i>
          {"Add Images"}
        </label>
      </div>
      <ImageEdit
        OnClosed={OnImageEditClosed}
        OnDelete={OnImageDelete}
        Visible={ImageEditVisibility}
        ImageSrc={Value}
      />
    </div>
  );
};
export default ImageSelector;
