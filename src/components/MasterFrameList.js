import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { instanceBackEnd } from "../api/axios.js";
import FrameTableList from "./child/FrameTableList.js";

const MasterFrameList = () => {
  const [masterFrames, setMasterFrames] = useState([]);

  useEffect(() => {
    getMasterFrames();
  }, []);
  console.log("instanceBackEnd = " + instanceBackEnd);
  const getMasterFrames = async () => {
    const response = await instanceBackEnd.get("getMframe");
    console.log(response.data);
    setMasterFrames(response.data);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {/* <h1>Lorem ipsum dolor sit amet. HEEELLPPP</h1> */}
        <Link to={"charging"} className="button is-success">
          Start Charging
        </Link>
        <FrameTableList message={masterFrames} />
      </div>
    </div>
  );
};

export default MasterFrameList;
