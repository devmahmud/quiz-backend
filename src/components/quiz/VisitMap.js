import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

function VisitMap({ path }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyApMCuyWLanb3QOxQSq-amkRCsO0uj3VxA">
      <GoogleMap mapContainerStyle={containerStyle} center={path[0]} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <Polyline path={path} options={options} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(VisitMap);
