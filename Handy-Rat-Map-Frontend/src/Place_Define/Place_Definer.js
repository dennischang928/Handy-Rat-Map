import React, { useEffect, useState } from "react";
import ImageSelector from "./ImageSelector";
import { Transition } from "semantic-ui-react";
import useSound from 'use-sound';
import CreateSuccessSoundEffect from './CreateSuccessSoundEffect.mp3';
import CreateFailSoundEffect from './CreateFailSoundEffect.mp3';

const Place_Definer = ({ visible, CompanyCreateState, message, OnClosed, OnSumbit, Lat, Lng, Address }) => {
  const ShopTypeOptions = [
    {
      value: "BAR",
      name: "Bar"
    },
    {
      value: "RESTR",
      name: "Restaurant"
    },
    {
      value: "SMKT",
      name: "Supermarket"
    },
    {
      value: "BTQ",
      name: "Boutique"
    },
    {
      value: "SCH",
      name: "School"
    }
  ];

  const [ImageSrc, setImageSrc] = useState([]);
  const [ShopName, setShopName] = useState("");
  const [ShopType, setShopType] = useState(ShopTypeOptions[0].value);
  const [ShopDescription, setShopDescription] = useState()
  const [playSuccess] = useSound(CreateSuccessSoundEffect)
  const [playFail] = useSound(CreateFailSoundEffect)
  useEffect(() => {
    if (CompanyCreateState === 2) {
      playSuccess();
    } else if (CompanyCreateState === 3) {
      playFail();
    }
  }, [CompanyCreateState]);
  const OnShopNameChange = E => {
    setShopName(E.target.value);
  };

  const OnShopTypeChange = E => {
    setShopType(E.target.value);
  };
  const OnShopDescriptionChange = E => {
    setShopDescription(E.target.value);
  };
  const OnImageSrcChange = E => {
    setImageSrc(E);
  };

  const OnImageDelete = index => {
    setImageSrc(ImageSrc.filter((e, i) => i != index));
  };



  const ShopTypes = ShopTypeOptions.map(Element => {
    return <option value={Element.value}>{Element.name}</option>;
  });

  return (
    <Transition visible={visible} animation="fade up" duration={700}>
      <div
        style={{
          position: "fixed",
          bottom: "0%",
          width: "100%"
        }}
      >
        <div className="ui segment">
          <div className={`ui ${CompanyCreateState === 2 ? "active" : "inactive"} inverted dimmer`}>
            <i className="big check icon"></i>
            {`${ShopName} is created!`}
          </div>
          <div className={`ui ${CompanyCreateState === 3 ? "active" : "inactive"} dimmer`}>
            <i className="inverted big exclamation triangle icon"></i>
            <div style={{
              color: "white"
            }}>
              {`Create "${ShopName}" fail.`}
            </div>
            <n />
            <div style={{
              color: "red"
            }}>
              {message}
            </div>
          </div>
          <i
            onClick={OnClosed}
            style={{
              position: "absolute",
              right: "50%",
              transform: "translate(+50%, -50%) scale(1.3)"
            }}
            className="caret down icon"
          ></i>
          <br />
          <div className="ui form">
            <div className="ui grid">
              <div className="two column row">
                <div className="column">
                  <div className="field">
                    <label>Shop name</label>
                    <input
                      type="text"
                      name="SHOP-NAME"
                      placeholder="e.g., Ray's Bar"
                      value={ShopName}
                      onChange={OnShopNameChange}
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label>Shop Type</label>
                    <select
                      className="ui fluid dropdown"
                      onChange={OnShopTypeChange}
                      value={ShopType}
                    >
                      {ShopTypes}
                    </select>
                  </div>
                </div>
              </div>
              <ImageSelector
                Value={ImageSrc}
                onChange={OnImageSrcChange}
                OnImageDelete={OnImageDelete}
              />
              <div className="two column row">
                <div className="fourteen wide column">
                  <div className="field">
                    <label>Description</label>
                    <textarea
                      rows="1"
                      value={ShopDescription}
                      onChange={OnShopDescriptionChange}
                    ></textarea>
                  </div>
                </div>
                <div className="two wide column">
                  <i
                    onClick={() => {
                      console.log(typeof (Address));
                      OnSumbit({
                        ShopName: ShopName,
                        ShopType: ShopType,
                        ImageSrc: ImageSrc,
                        ShopDescription: ShopDescription,
                        Addr: Address,
                        Lat: Lat,
                        Lng: Lng
                      });
                    }}
                    className={CompanyCreateState === 0 ? "paper plane outline icon" : ""}
                    style={{
                      transform: "scale(2)",
                      position: "absolute",
                      bottom: "35%",
                      left: "25%"
                    }}
                  >
                    <div style={{ zIndex: 10 }} className={`ui mini ${CompanyCreateState === 1 ? "active" : " inactive"} inline loader`}> </div>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </Transition >

  );
};

export default Place_Definer;
