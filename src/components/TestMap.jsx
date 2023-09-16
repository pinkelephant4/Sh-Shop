import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Polygon, Tooltip, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./mapData";
import "./styles.css";

function Map({ filteredData }) {
  const mapRef = useRef(null); // Reference to the map container
  const center = [40.150868, -92.912024];
  const [selectedStateData, setSelectedStateData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const stateInitials = {
    // ... (your state initials mapping here)
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  };

  const calculateStateCenter = (stateCoordinates) => {
    // Calculate the center of the state's coordinates
    const latitudes = stateCoordinates.map((coords) => coords[0]);
    const longitudes = stateCoordinates.map((coords) => coords[1]);
    const stateCenter = [
      (Math.max(...latitudes) + Math.min(...latitudes)) / 2,
      (Math.max(...longitudes) + Math.min(...longitudes)) / 2,
    ];
    return stateCenter;
  };

  const handleStateClick = (stateName, stateCoordinates) => {
    setSelectedState(stateName);
    const selectedData = filteredData.filter(
      (item) => item.state_name === stateName
    );

    console.log("hello");
    console.log(selectedData);
    // if(selectedData.length==0){
    //   selectedData=[{state_name:stateName}]
    // }
    setSelectedStateData(selectedData);

    // Calculate the center of the selected state and set it as the map's center
    if (mapRef.current) {
      const stateCenter = calculateStateCenter(stateCoordinates);
      mapRef.current.setView(stateCenter, 5); // Adjust the zoom level as needed
    }
  };

  const resetStateSelection = () => {
    setSelectedState(null);
    setSelectedStateData(null);

    // Reset the map zoom and center to its normal state
    if (mapRef.current) {
      mapRef.current.setView(center, 3.5); // Set your default zoom level as needed
    }
  };

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={selectedState ? center : [40.150868, -92.912024]}
        zoom={selectedState ? 5 : 3.5}
        style={{ width: "49.8vw", height: "75vh", backgroundColor: "#0000" }}
        zoomControl={false}
        attributionControl={false}
      >
        {statesData.features.map((state) => {
          if (selectedState && state.properties.name !== selectedState) {
            // Skip rendering other states if a state is selected
            return null;
          }

          let color = "white";
          const stateName = state.properties.name;
          const stateCoordinates = state.geometry.coordinates[0].map((item) => [
            item[1],
            item[0],
          ]);

          if (filteredData.length !== 0) {
            const stateSumSellout = filteredData
              .filter(
                (item) =>
                  item.state_name === stateName &&
                  item.Actual_Sellout !== undefined
              )
              .map((item) => parseInt(item.Actual_Sellout))
              .reduce((acc, curr) => acc + curr, 0);

            const stateSumTarget = filteredData
              .filter(
                (item) =>
                  item.state_name === stateName && item.Target !== undefined
              )
              .map((item) => parseFloat(item.Target))
              .reduce((acc, curr) => acc + curr, 0);
            if (
              filteredData.filter((item) => {
                console.log(item.state_name, stateName);
                return item.state_name == stateName;
              }).length > 0
            ) {
              if (stateSumTarget < stateSumSellout) {
                color = "green";
              } else if (stateSumTarget >= stateSumSellout) {
                color = "red";
              }
            }
          }

          const stateInitial = stateInitials[stateName] || "";

          return (
            <Polygon
              key={stateName}
              pathOptions={{
                fillColor: `${color}`,
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: "grey",
              }}
              positions={stateCoordinates}
              eventHandlers={{
                click: () => {
                  if (
                    filteredData.filter((item) => {
                      console.log(item.state_name, stateName);
                      return item.state_name == stateName;
                    }).length > 0
                  ) {
                    handleStateClick(stateName, stateCoordinates);
                  } else {
                    //show popup that state data iusnt availaable
                    alert("State Data isnt available");
                  }
                },
              }}
            >
              <Tooltip direction="center" offset={[0, 0]} opacity={1} permanent>
                {stateInitial}
              </Tooltip>
            </Polygon>
          );
        })}

        {selectedState && selectedStateData && (
          <>
            {selectedStateData.map((city) => (
              <Marker key={city.ID} position={[city.latitude, city.longitude]}>
                <Popup>{city.store_name}</Popup>
              </Marker>
            ))}
            {selectedStateData.length > 0 && (
              <Popup position={[center[0], center[1]]}>
                {selectedStateData[0].state_name}
                <button onClick={resetStateSelection}>Close</button>
              </Popup>
            )}
          </>
        )}
      </MapContainer>

      <div className="quadrant-btnDiv">
        {selectedState && (
          <button className="btn btn-outline-dark ">Choose Quadrant</button>
        )}
      </div>
    </>
  );
}

export default Map;
