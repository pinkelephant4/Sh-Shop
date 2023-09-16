import React, { useEffect, useState } from "react";
import Navbar from "../components/Nav";
import FiltersC from "../components/FiltersCarriers";
import FiltersD from "../components/FiltersDevices";
import Map from "../components/Map";
import "../components/styles.css";
import { GrFilter } from "react-icons/gr";
import TestMap from "../components/TestMap"
import useZustandStore from "../components/store";

// loading thing for fast react fetching

function Dash() {

  const data = useZustandStore.getState().apiData;
  const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    if (type === "week") {
      unique = unique.flat();
    }
    return [...new Set(unique)];
  };

  const [carrier, setCarrier] = useState("");
  const [device, setDevice] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getData();
    // console.log(apiData);

    useZustandStore.setState({
      weekOptions: getUniqueValues(apiData, "week"),
      yearOptions: getUniqueValues(apiData, "year"),
    });

    // console.log(useZustandStore.getState().weekOptions);
    // console.log(useZustandStore.getState().yearOptions);

  }, [apiData]);

  //get week and month array from the zustand store
  const weekOptions = useZustandStore((state) => state.weekOptions);
  const yearOptions = useZustandStore((state) => state.yearOptions);

  // console.log(weekOptions);
  // console.log(yearOptions);

  //function to get unique values of week and year from the api data(in the zustand store) and set it to the zustand store


  //set week and year state variables to the first value of the week and year array

  const [totalSales, setTotalSales] = useState(-1);
  const [wow, setWow] = useState(-1);
  const [targetAch, setTargetAch] = useState(-1);
  const [filteredData, setFilteredData] = useState([]);

 
  useEffect(() => {
    if (carrier && device && year && week) {
      const localFilter =
        apiData &&
        apiData.filter((tuple) => {
          return (
            tuple.week === parseInt(week) &&
            tuple.year === parseInt(year) &&
            tuple.Product_Model === device &&
            tuple.Retailer === carrier
          );
        });

      setFilteredData(localFilter);

      // console.log(localFilter);

      const sumAcutalSellout = localFilter
        .filter((item) => item.Actual_Sellout !== undefined)
        .map((item) => parseInt(item.Actual_Sellout, 10))
        .reduce((acc, curr) => acc + curr, 0);

      setTotalSales(sumAcutalSellout);

      const sumTarget = localFilter
        .filter((item) => item.Target !== undefined)
        .map((item) => parseFloat(item.Target, 10))
        .reduce((acc, curr) => acc + curr, 0);

      setTargetAch(((sumAcutalSellout / sumTarget) * 100).toFixed(4));

      const sumPreSellout = apiData
        .filter(
          (tuple) =>
            tuple.week === parseInt(week) - 1 &&
            tuple.year === parseInt(year) &&
            tuple.Product_Model === device &&
            tuple.Retailer === carrier
        )
        .map((item) => parseInt(item.Actual_Sellout))
        .reduce((acc, curr) => curr + acc, 0);

      setWow(((sumAcutalSellout / sumPreSellout) * 100).toFixed(4));
    }
  }, [carrier, device, year, week, apiData]);

  // let apiData = [];

  // const getData = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://script.googleusercontent.com/macros/echo?user_content_key=JmAjbwcwCuxscKS5A0vvn_VpxnnYn4u-imHWi-YNZNel2NN78BsOlOI3baNdSC_t-x_WHdYH7deWk1bGoeLJ3tLivHhYgw_5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOptTkAkfT00XUELqQQ0A7ryNqvp-2ylB4zwrfVmltecnV2bAbXGNMVAv6IMS_j6YDDyAC_aH6Jf8Hh-laR9ucSvru7BhmMUZNz9Jw9Md8uu&lib=MYh46KwtR1PGqq2iJu_X2srTH389liFSA"
  //     );
  //     const data = await res.json();
  //     setApiData(data.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getData = () => {
    //get data from the zustand store
    setApiData(data);
  };
  const handleYearChange = async (e) => {
    setYear(e.target.value);
  };
  const handleWeekChange = async (e) => {
    setWeek(e.target.value);
  };

  const changeCarrier = (val) => {
    setCarrier(val);
  };
  const changeDevice = (val) => {
    setDevice(val);
  };

  return (
    <>
      <div className="layer">
        <div className="topDiv">
          <Navbar />
          <div className="searchDiv">
            <div className="searchDivContent">
              <span>Result </span>
              <span> For: </span>
              <div className="yearDiv" style={{ margin: "0 20px" }}>
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={handleYearChange}
                  defaultValue="default"
                >
                  <option value="default" disabled>
                    Select Year
                  </option>

                  {yearOptions.map((year) => {
                    return <option value={year}>{year}</option>;
                  }
                  )}
                  {/* <option value="2023">2023</option> */}
                  {/* <option value="2022">2022</option> */}
                </select>
              </div>
              <div className="weekDiv">
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={handleWeekChange}
                  defaultValue="default"
                >
                  <option value="default" disabled>
                    Select Week
                  </option>

                  {weekOptions.map((week) => {
                    return <option value={week}>{week}</option>;
                  }
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="paramsDiv">
            <FiltersC changeCarrier={changeCarrier} />
            <FiltersD changeDevice={changeDevice} />
          </div>
          <div className="rightDiv">
            <div className="filteredRatioDiv">
              <div>
                <GrFilter />
                {"  "} KPI Filters :
              </div>
              <div className="param">
                {/* {values.totalSales === -1 ? "Total Sales" : values.totalSales} */}
                {totalSales === -1
                  ? "Total Sales"
                  : `Total Sales: ${totalSales}`}
              </div>
              <div className="param">
                {/* {values.wow === -1 ? "WOW" : values.wow} */}
                {wow === -1 ? "WOW" : `WOW: ${wow}`}
              </div>
              <div className="param">
                {/* {values.targetAch === -1
                  ? "Target Achievement"
                  : values.targetAch} */}
                {targetAch === -1
                  ? "Target Achievement"
                  : `Target Achievement: ${targetAch}`}
              </div>
            </div>
            <div className="mapDiv">
              <TestMap filteredData={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dash;
