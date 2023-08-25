import React from "react";
// import { instanceBECreateJson } from "../api/axios.js";
import NavbarHeader from "./child/NavbarHeader.js";
import NavbarSamping from "./child/NavbarSamping.js";
import PreloadStart from "./child/PreloadStart.js";
import CreateTicketChild from "./child/CreateTicketChild.js";

const CreateTicket = () => {
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
                <CreateTicketChild />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
