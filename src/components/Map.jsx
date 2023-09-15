import React from "react";
import { MapContainer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./mapData";
import "./styles.css";

function Map({ filteredData }) {
  const center = [40.150868, -92.912024];

  return (
    <MapContainer
      center={center}
      zoom={3.5}
      style={{ width: "49.8vw", height: "75vh", backgroundColor: "#0000" }}
      zoomControl={false}
      attributionControl={false}
    >
      {statesData.features.map((state) => {
        let color = "";

        const stateFilteredData = filteredData.filter(
          (item) => item.state_name === state.properties.name
        );

        const stateSumSellout = stateFilteredData.reduce(
          (acc, item) => acc + parseFloat(item.Actual_Sellout || 0),
          0
        );

        const stateSumTarget = stateFilteredData.reduce(
          (acc, item) => acc + parseFloat(item.Target || 0),
          0
        );

        color = stateSumTarget > stateSumSellout ? "red" : "green";

        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            key={state.properties.name}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              click: (e) => {},
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: 3,
                  color: "dark-grey",
                  fillColor: "light-green",
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: color,
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: "white",
                });
              },
            }}
          >
            {/* <Tooltip
              direction="center"
              offset={[0, 0]}
              opacity={1}
              permanent
              className="custom-tooltip"
            >
              {state.properties.name}
            </Tooltip> */}
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

export default Map;
