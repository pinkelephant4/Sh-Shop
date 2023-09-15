import React from "react";
import { useState } from "react";
import P6 from "../assets/images/pix-6.png";
import P7 from "../assets/images/pix-7.png";
import P7a from "../assets/images/pix-7a.png";
import P7pro from "../assets/images/pix-7pro.png";

function FiltersD({ changeDevice }) {
  const [activeDev, setActiveDev] = useState("");

  const handleClick = (e) => {
    // console.log(e.target.alt);
    setActiveDev(e.target.alt);
    changeDevice(e.target.alt);
  };
  return (
    <>
      <div className="deviceBox">
        <h4 style={{ paddingLeft: "25px" }}>Choose Devices</h4>

        <div className="carrierOptionsBox">
          <div className="carrierOption" onClick={handleClick}>
            <img
              src={P6}
              className="carrierImage"
              alt="Pixel 6a"
              style={
                activeDev === "Pixel 6a"
                  ? {
                      border: "solid 2px blue",
                      width: "100%",
                      borderRadius: "10px",
                    }
                  : { width: "100%" }
              }
            />
          </div>
          <div className="carrierOption" onClick={handleClick}>
            <img
              src={P7}
              className="carrierImage"
              alt="Pixel 7"
              style={
                activeDev === "Pixel 7"
                  ? {
                      border: "solid 2px blue",
                      width: "100%",
                      borderRadius: "10px",
                    }
                  : { width: "100%" }
              }
            />
          </div>
        </div>
        <div className="carrierOptionsBox">
          <div className="carrierOption" onClick={handleClick}>
            <img
              src={P7a}
              className="carrierImage"
              alt="Pixel 7a"
              style={
                activeDev === "Pixel 7a"
                  ? {
                      border: "solid 2px blue",
                      width: "100%",
                      borderRadius: "10px",
                    }
                  : { width: "100%" }
              }
            />
          </div>

          <div className="carrierOption" onClick={handleClick}>
            <img
              src={P7pro}
              className="carrierImage"
              alt="Pixel 7 Pro"
              style={
                activeDev === "Pixel 7 Pro"
                  ? {
                      border: "solid 2px blue",
                      width: "100%",
                      borderRadius: "10px",
                    }
                  : { width: "100%" }
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltersD;

// pixel 7 ->3
// 7pro -> 2
// 7a -> 41
