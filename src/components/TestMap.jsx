import React, { useEffect, useState } from "react";
import { MapContainer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./mapData";
import "./styles.css";

function Map({ filteredData }) {
  const center = [40.150868, -92.912024];
  //   const [filteredData, setFilteredData] = useState([]);

  //   console.log(filteredData);

  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [selectedProductModel, setSelectedProductModel] = useState("");

  // Mapping of state names to initials
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

  useEffect(() => {
    // Fetch data from your API here
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=pRsJoncFwIJXXU06QTw5VJK87gGAWYgiYp06hVWtdN3P-64ovJb8tF8FoC0owV_U-T3re6Ai9owbqQtf_OAoX3R_2JHJIi_Cm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnE2I0sBLNE3U_h0ZFoCfKnfcwz0q-ORT_dCNsHUysMLKJNCGgM2iANgbcNAsnKJ1UoyAcRVpRckhtaD1tTb8pfLOIiyBLPoGbNz9Jw9Md8uu&lib=MYh46KwtR1PGqq2iJu_X2srTH389liFSA"
    )
      .then((response) => response.json())
      .then((data) => {
        // Assuming your API response structure matches your provided sample format
        const apiData = data.data.slice(1).map((row) => {
          return {
            week: row[0],
            year: row[1],
            date_of_week: row[2],
            location: row[3],
            address: row[4],
            banner: row[5],
            latitude: row[6],
            longitude: row[7],
            ice_store_id: row[8],
            store_name: row[9],
            store_state: row[10],
            state_name: row[11],
            store_city: row[12],
            covered_notcovered: row[13],
            chain_name: row[14],
            strategic_tiering: row[15],
            segment_name: row[16],
            dealer_type: row[17],
            weekly_sales: row[18],
            ID: row[19],
            segment_name_changed: row[20],
            Product_Model: row[21],
            Actual_Sellout: row[22],
            Target: row[23],
            Four_Cycle: row[24],
            Four_Cycle_Sellout: row[25],
            Four_Cycle_Achievement: row[26],
            Cycle: row[27],
            Cycle_Sellout: row[28],
            Cycle_Achievement: row[29],
            Quadrant: row[30],
            QTD_Sales: row[31],
            QTD_Target: row[32],
            "QTD_Target%": row[33],
            Quarterly_Target: row[34],
            "Quarterly_Target%": row[35],
            Retailer: row[36],
          };
        });

        // setFilteredData(apiData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={3.5}
      style={{ width: "49.8vw", height: "75vh", backgroundColor: "#0000" }}
      zoomControl={false}
      attributionControl={false}
    >
      {statesData.features.map((state) => {
        let color = "white"; // Default color is white

        const stateName = state.properties.name;
        if (filteredData.length !== 0) {
          // console.log(filteredData);
          const stateSumSellout = filteredData
            .filter((item) => {
              return (
                item.state_name === stateName &&
                item.Actual_Sellout !== undefined
              );
            })
            .map((item) => {
              return parseInt(item.Actual_Sellout);
            })
            .reduce((acc, curr) => {
              return acc + curr;
            }, 0);

          const stateSumTarget = filteredData
            .filter((item) => {
              item.state_name === stateName && item.Target !== undefined;
            })
            .map((item) => {
              //   console.log(item.Target);
              parseFloat(item.Target);
            })
            .reduce((acc, curr) => acc + curr, 0);

          // console.log(stateSumTarget, stateSumSellout, stateName);

          if (stateName === "California") {
            console.log(stateSumTarget, stateSumSellout, stateName);
          }

          //   color = stateSumTarget > stateSumSellout ? "red" : "green";

          if (stateSumTarget < stateSumSellout) {
            color = "green";
          }
          else if (stateSumTarget >= stateSumSellout) {
            color = "red";
          } else {
            color = "white";
          }
        }

        // Find the corresponding data for the current state

        // console.log(stateData);

        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        // Get state initials from the mapping
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
            positions={coordinates}
          >
            <Tooltip direction="center" offset={[0, 0]} opacity={1} permanent>
              {stateInitial}
            </Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

export default Map;