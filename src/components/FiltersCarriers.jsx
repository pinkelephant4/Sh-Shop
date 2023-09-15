import React, { useState } from "react";
import Verizon from "../assets/images/verizon-img.png";
import TMobile from "../assets/images/tmob-img.png";
import ATT from "../assets/images/AT&T-img.png";
import BestBuy from "../assets/images/bestbuy-img.png";

function FiltersC({ changeCarrier }) {
  const [activeCarr, setActiveCarr] = useState("");

  const handleClick = (e) => {
    console.log(e.target.alt);
    setActiveCarr(e.target.alt);
    changeCarrier(e.target.alt);
  };
  return (
    <>
      <div className="carrierBox">
        <h4 style={{ paddingLeft: "25px" }}>Choose Carrier</h4>

        <div className="carrierOptionsBox">
          <div className="carrierOption">
            <img
              src={Verizon}
              className="carrierImage"
              alt="Verizon"
              style={{ width: "100%" }}
            />
          </div>

          <div className="carrierOption">
            <img
              src={TMobile}
              className="carrierImage"
              alt="TMobile"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="carrierOptionsBox">
          <div className="carrierOption" onClick={handleClick}>
            <img
              style={
                activeCarr === "ATT"
                  ? {
                      border: "solid 2px blue",
                      width: "100%",
                      borderRadius: "10px",
                    }
                  : { width: "100%" }
              }
              src={ATT}
              className="carrierImage"
              alt="ATT"
            />

          </div>

          <div className="carrierOption" onClick={handleClick}>
            <img
              style={
                activeCarr === "BestBuy"
                  ? {
                      border: "solid 2px blue",
                      width: "100%",
                      borderRadius: "10px",
                    }
                  : { width: "100%" }
              }
              src={BestBuy}
              className="carrierImage"
              alt="BestBuy"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltersC;
