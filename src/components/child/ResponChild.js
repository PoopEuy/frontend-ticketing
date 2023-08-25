import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../../api/axios";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function ResponChild() {
  const { state } = useLocation();
  const { data } = state;

  const [problemList, setProblemList] = useState([]);
  const [solutionList, setSolutionList] = useState([]);
  const [ticketCode, setTicketCode] = useState([]);
  const [timeCreated, setTimeCreated] = useState([]);
  const [siteName, setSiteName] = useState([]);
  const [siteStatus, setSiteStatus] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const [totalTicket, setTotalTicket] = useState([]);
  const [responseText, setResponseText] = useState([]);
  // const [responseAt, setResponseAt] = useState([]);

  //popupstatws
  const [showResult, setShowResult] = useState(false);
  const [popupResult, setPopupResult] = useState([]);

  const handleCloseResult = () => setShowResult(false);

  useEffect(() => {
    //defined processForm
    const processForm = async () => {
      const newProblemList = [];
      const newSolutionList = [];
      const problemCode = data.problem_id;
      const ticket_code = data.ticket_code;
      const timeCreated = data.ts;
      const site_name = data.site_name;
      const status_site = data.status_site;
      const status_ticket = data.status_ticket;
      const counter = data.counter;
      const responseText = data.response;
      // const responseAt = data.response_at;

      setTicketCode(ticket_code);
      setTimeCreated(timeCreated);
      setSiteName(site_name);
      setSiteStatus(status_site);

      setTotalTicket(counter);
      setResponseText(responseText);
      // setResponseAt(responseAt);
      console.log("status_ticket1 : " + status_ticket);
      // console.log("responseAt : " + responseAt);

      if (status_ticket === "open") {
        document.getElementById("openTicket").checked = true;
        setTicketStatus(status_ticket);
      }
      if (status_ticket === "closed") {
        document.getElementById("closeTicket").checked = true;
        setTicketStatus(status_ticket);
      }
      for (let i = 0; i < problemCode.length; i++) {
        // ... other code ...
        const problemId = problemCode[i];
        try {
          //cek problemBy problemid
          const payloadProblem = {
            problem_id: problemId,
          };
          const resProblem = await instanceBackEnd.post(
            "checkProblemId",
            payloadProblem
          );
          const dataProblem = await resProblem.data.data.problem;
          const ProblemCheck = newProblemList.includes(dataProblem);

          if (!ProblemCheck) {
            newProblemList.push(dataProblem);
            setProblemList(newProblemList);
          }

          ////cek solusi by problemid
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

            const solusiCheck = newSolutionList.includes(textSolusi);
            if (!solusiCheck) {
              newSolutionList.push(textSolusi);
              setSolutionList(newSolutionList);
            }
          }
        } catch (error) {
          // console.log("axiosTryCatch");
        }
      }
    };

    //panggil processForm
    processForm();
  }, [
    data.counter,
    data.problem_id,
    data.response,
    data.site_name,
    data.status_site,
    data.status_ticket,
    data.ticket_code,
    data.ts,
  ]);

  const handleClick = () => {
    sendResponse();
  };

  const sendResponse = async () => {
    console.log("Button Create");
    console.log("status : " + ticketStatus);
    const responseText = document.getElementById("responseText").value;
    console.log("response text : " + responseText + " " + ticketCode);

    const payloadUpdate = {
      ticket_code: ticketCode,
      status_ticket: ticketStatus,
      responseTicket: responseText,
      // responseAt: responseAt,
    };
    const resUpdate = await instanceBackEnd.post(
      "updateResponse",
      payloadUpdate
    );

    const msgUpdate = await resUpdate.data.msg;
    console.log("msgUpdate : " + msgUpdate);

    if (msgUpdate === "responseSukses") {
      const ress_messages = "Thanks For Responding";
      setPopupResult(ress_messages);
    }

    if (msgUpdate !== "responseSukses") {
      const ress_messages = "Failed, Please Try Again";
      setPopupResult(ress_messages);
    }

    setShowResult(true);
  };

  const openCheckBox = () => {
    const status_ticket = "open";
    setTicketStatus(status_ticket);
  };
  const closeCheckBox = () => {
    const status_ticket = "closed";
    setTicketStatus(status_ticket);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="page-header-title">
                <h5 className="m-b-10">Site Trouble Ticket</h5>
                <p className="m-b-0">Ticket List</p>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="breadcrumb-title">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    {" "}
                    <i className="fa fa-home" />{" "}
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#!">Ticket List</a>
                </li>
                {/* <li className="breadcrumb-item">
                  <a href="#!">Basic Tables</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body">
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
                      <div className="card-header-right">
                        <ul className="list-unstyled card-option">
                          <li>
                            <i className="fa fa fa-wrench open-card-option" />
                          </li>
                          <li>
                            <i className="fa fa-window-maximize full-card" />
                          </li>
                          <li>
                            <i className="fa fa-minus minimize-card" />
                          </li>
                          <li>
                            <i className="fa fa-refresh reload-card" />
                          </li>
                          <li>
                            <i className="fa fa-trash close-card" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-block">
                      <h4 className="sub-title">Response</h4>
                      <form>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Ticket Code
                          </label>
                          <div className="col-sm-10">
                            <input
                              id="ticketCode"
                              type="text"
                              className="form-control"
                              // placeholder="maan-1692204506842"
                              readOnly
                              value={ticketCode}
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
                              value={timeCreated}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Site Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              id="siteName"
                              type="text"
                              className="form-control"
                              // placeholder="maan"
                              readOnly
                              value={siteName}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Site Status
                          </label>
                          <div className="col-sm-10">
                            <input
                              id="siteStatus"
                              type="text"
                              className="form-control"
                              // placeholder="warning"
                              readOnly
                              value={siteStatus}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Ticket Status
                          </label>
                          <div className="col-sm-10">
                            {/* <div className="col-xs-2">
                      <div className="checkbox-inline">
                        <label className="checkbox-inline">
                          <input id="openBox" type="checkbox" defaultValue />
                          <span className="ml-1">Open</span>
                        </label>
                      </div>

                      <div className="checkbox-inline">
                        <label className="checkbox-inline">
                          <input id="openBox" type="checkbox" defaultValue />
                          <span className="ml-1">Close</span>
                        </label>
                      </div>
                    </div> */}
                            <label className="btn btn-secondary">
                              <input
                                type="radio"
                                name="option"
                                id="openTicket"
                                autoComplete="off"
                                // defaultChecked
                                value={ticketCode}
                                onClick={openCheckBox}
                              />{" "}
                              Open
                            </label>
                            <label className="btn btn-secondary">
                              <input
                                type="radio"
                                name="option"
                                id="closeTicket"
                                autoComplete="off"
                                onClick={closeCheckBox}
                              />{" "}
                              Closed
                            </label>
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
                              value={totalTicket}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Problem
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              id="problemList"
                              rows={5}
                              cols={5}
                              className="form-control"
                              // placeholder="Default textarea"
                              readOnly
                              value={problemList.join("\n")}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Solution
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              id="solutionList"
                              rows={5}
                              cols={5}
                              className="form-control"
                              // placeholder="Default textarea"
                              readOnly
                              value={solutionList.join("\n")}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Response
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              id="responseText"
                              rows={5}
                              cols={5}
                              className="form-control"
                              // placeholder="Default textarea"
                              defaultValue={responseText}
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
          </div>
        </div>

        <Modal show={showResult} onHide={handleCloseResult}>
          {/* <Modal.Header closeButton></Modal.Header> */}
          <Modal.Body style={{ textAlign: "center" }}>
            <h5>
              <b>{popupResult}</b>
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button
              href="/ListPage"
              variant="primary"
              onClick={handleCloseResult}
            >
              Back to Ticket List
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ResponChild;
