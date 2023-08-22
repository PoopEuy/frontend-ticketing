import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../../api/axios.js";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation } from "react-router-dom";

function ResponChild() {
  const { state } = useLocation();
  const { data } = state; // Read values passed on state
  var ArrProblem = [];
  var ArrSolusi = [];
  const ticket_code = data.ticket_code;

  useEffect(() => {
    processForm();
  }, [ticket_code]);

  const processForm = async () => {
    // const response = await instanceBackEnd.get("getMframe");
    // console.log(response.data);
    // setMasterFrames(response.data);
    document.getElementById("ticketCode").value = data.ticket_code;
    document.getElementById("timeCreated").value = data.ts;
    document.getElementById("siteName").value = data.site_name;
    document.getElementById("siteStatus").value = data.status_site;
    document.getElementById("ticketStatus").value = data.status_ticket;
    document.getElementById("totalTicket").value = data.counter;

    const problemCode = data.problem_id;
    //forloop problemid
    for (let i = 0; i < problemCode.length; i++) {
      console.log("data ke-" + i);
      console.log("problemCode : " + problemCode[i]);

      const problemId = problemCode[i];

      const payloadProblem = {
        problem_id: problemId,
      };

      const resProblem = await instanceBackEnd.post(
        "checkProblemId",
        payloadProblem
      );
      //cek problemBy problemid
      const dataProblem = await resProblem.data.data.problem;

      //cegah arr data sama
      const ProblemCheck = ArrProblem.includes(dataProblem);

      if (ProblemCheck !== true) {
        ArrProblem.push(dataProblem);

        console.log("ArrProblem : " + ArrProblem);

        document.getElementById("problemList").value = ArrProblem;
      }

      //cek solusi by problemid
      const payloadSolusi = {
        problem_id: problemId,
      };

      const resSolusi = await instanceBackEnd.post(
        "checkSolusiId",
        payloadSolusi
      );

      const dataSolusi = await resSolusi.data.data;
      for (let h = 0; h < dataSolusi.length; h++) {
        const textSolusi = dataSolusi[h].solusi;
        console.log("Data solusi : " + textSolusi);

        const solusiCheck = ArrSolusi.includes(textSolusi);

        if (solusiCheck !== true) {
          ArrSolusi.push(textSolusi);
          console.log("ArrSolusi : " + ArrSolusi);

          document.getElementById("solutionList").value = ArrSolusi;
        }
      }
    }

    //onlick Create
    const handleClick = (e) => {
      console.log("Button Create");
    };
  };

  return (
    <div className="pcoded-inner-content">
      <div className="row">
        <div className="col-sm-12">
          {/* Basic Form Inputs card start */}
          <div className="card">
            <div className="card-header">
              <h5>Response Form</h5>
              {/* <span>
                Add class of <code>.form-control</code> with
                <code>&lt;input&gt;</code> tag
              </span> */}
            </div>
            <div className="card-block">
              <h4 className="sub-title">Response</h4>
              <form>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Ticket Code</label>
                  <div className="col-sm-10">
                    <input
                      id="ticketCode"
                      type="text"
                      className="form-control"
                      // placeholder="maan-1692204506842"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Ticket Created
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="timeCreated"
                      type="text"
                      className="form-control"
                      // placeholder="2023-08-16 23:48:26"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Site Name</label>
                  <div className="col-sm-10">
                    <input
                      id="siteName"
                      type="text"
                      className="form-control"
                      // placeholder="maan"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Site Status</label>
                  <div className="col-sm-10">
                    <input
                      id="siteStatus"
                      type="text"
                      className="form-control"
                      // placeholder="warning"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    Ticket Status
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="ticketStatus"
                      type="text"
                      className="form-control"
                      // placeholder="open"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">
                    History Total
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="totalTicket"
                      type="text"
                      className="form-control"
                      // placeholder="open"
                      readOnly
                    />
                  </div>
                </div>

                {/* <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Select Box</label>
                  <div className="col-sm-10">
                    <select name="select" className="form-control">
                      <option value="opt1">Select One Value Only</option>
                      <option value="opt2">Type 2</option>
                      <option value="opt3">Type 3</option>
                      <option value="opt4">Type 4</option>
                      <option value="opt5">Type 5</option>
                      <option value="opt6">Type 6</option>
                      <option value="opt7">Type 7</option>
                      <option value="opt8">Type 8</option>
                    </select>
                  </div>
                </div> */}

                {/* <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Static Text</label>
                  <div className="col-sm-10">
                    <div className="form-control-static">
                      Hello !... This is static text
                    </div>
                  </div>
                </div> */}

                {/* <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Upload File</label>
                  <div className="col-sm-10">
                    <input type="file" className="form-control" />
                  </div>
                </div> */}
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Problem</label>
                  <div className="col-sm-10">
                    <textarea
                      id="problemList"
                      rows={5}
                      cols={5}
                      className="form-control"
                      // placeholder="Default textarea"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Solution</label>
                  <div className="col-sm-10">
                    <textarea
                      id="solutionList"
                      rows={5}
                      cols={5}
                      className="form-control"
                      // placeholder="Default textarea"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Response</label>
                  <div className="col-sm-10">
                    <textarea
                      id="response"
                      rows={5}
                      cols={5}
                      className="form-control"
                      // placeholder="Default textarea"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light button-right"
                    id="sendResponse"
                    data-container="body"
                    data-toggle="popover"
                    title
                    data-placement="bottom"
                    data-content
                    data-original-title="Primary color states"
                    onClick={handleClick}
                  >
                    Send Response
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponChild;
