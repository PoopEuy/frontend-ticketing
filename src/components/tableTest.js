import React, { useState, useEffect } from "react";
// import { instanceBECreateJson } from "../api/axios.js";
import NavbarHeader from "./child/NavbarHeader.js";
import NavbarSamping from "./child/NavbarSamping.js";
import PreloadStart from "./child/PreloadStart.js";
import TableSite from "./child/TableSite.js";

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import { Modal, Button } from "react-bootstrap";
// import { json } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import FrameTableList from "./child/FrameTableList.js";

const TableTest = () => {
  return (
    <div>
      {/* Pre-loader start */}
      <div className="theme-loader">
        <PreloadStart />
      </div>
      {/* Pre-loader end */}
      <div id="pcoded" className="pcoded">
        <div className="pcoded-overlay-box"></div>
        <div className="pcoded-container navbar-wrapper">
          <NavbarHeader />

          <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
              <NavbarSamping />
              <div className="pcoded-content">
                <TableSite />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTest;
