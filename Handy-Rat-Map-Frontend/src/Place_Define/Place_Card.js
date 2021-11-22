import React, { useState } from "react";

const Place_Detail = ({ Card_Inform }) => {
  const [Lat, setLat] = useState(Card_Inform.Lat);
  const [Lng, setLng] = useState(Card_Inform.Lng);
  const [Address, setAddress] = useState(Card_Inform.Address);
  
  return <div></div>;
};

export default Place_Detail;
