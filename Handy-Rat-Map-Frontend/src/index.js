import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import 'semantic-ui-css/semantic.min.css'
import 'mapbox-gl/dist/mapbox-gl.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
