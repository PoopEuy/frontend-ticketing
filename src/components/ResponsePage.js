import React, { useState, useEffect } from "react";
// import { instanceBECreateJson } from "../api/axios.js";
import NavbarHeader from "./child/NavbarHeader.js";
import NavbarSamping from "./child/NavbarSamping.js";
import PreloadStart from "./child/PreloadStart.js";
import ResponChild from "./child/ResponChild.js";
import { useLocation } from "react-router-dom";

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import { Modal, Button } from "react-bootstrap";
// import { json } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import FrameTableList from "./child/FrameTableList.js";

const ResponPage = () => {
  const { state } = useLocation();
  const { data } = state; // Read values passed on state

  const ticketData = {
    ticket_code: data.ticket_code,
    ts: data.ts,
    site_name: data.site_name,
    status_site: data.status_site,
    status_ticket: data.status_ticket,
    counter: data.counter,
  };
  const [dataTickets, setDataTickets] = useState([]);
  console.log("ticketDataObject : " + dataTickets);
  console.log("ticketData : " + dataTickets.ticket_code);

  useEffect(() => {
    setDataTickets(ticketData);
  }, [data]);
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
                <ResponChild message={state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponPage;
