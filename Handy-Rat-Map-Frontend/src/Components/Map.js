import React, { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import ClickableMarker from "./CompanyFinderAPI/ClickableMarker";

const Map = ({ OnCenterChange, Lat, Lng, Markers, OnMarkerClick }) => {
  const [Width, setWidth] = useState(document.documentElement.clientWidth);
  const [Height, setHeight] = useState(document.documentElement.clientHeight);
  const [Companys, setCompanys] = useState([]);
  const map = useRef();

  // let map;
  const mapContainer = useRef(null);

  useEffect(() => {
    const setWindowSize = () => {
      setWidth(window.outerWidth);
      setHeight(window.outerHeight);
    };
    window.addEventListener("resize", setWindowSize);
    return () => {
      window.removeEventListener("resize", setWindowSize);
    };
  });

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVubmlzY2hhbmc5MjgiLCJhIjoiY2tzanRjanRiMXpsbDJvbnVxdTgxNHh4byJ9.AcPK9uy9CBN1DUX8g6G-_Q";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      zoom: 18 // starting zoom
    });
    map.current.setCenter([Lng, Lat]);
    map.current.on("move", () => {
      OnCenterChange(map.current.getCenter().lat, map.current.getCenter().lng);
    });
  }, []);


  useEffect(() => {
    console.log("Markers update")
    if (Markers === [] || Companys === []) {
      return
    } else {
      Companys.forEach(Company => {
        Company.remove();
      });
      setCompanys(
        Markers.map((Company) => {
          return new ClickableMarker({
            color: "#FF0000",
            anchor: 'bottom',
            draggable: false
          }).setLngLat([Company.Lng, Company.Lat])
            .addTo(map.current)
            .onClick(() => { OnMarkerClick(Company) });
        })
      )
    }
  }, [Markers]);
  // )

  return (
    <div>
      <div style={{
        height: Height,
        Width: Width
      }}
        ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
