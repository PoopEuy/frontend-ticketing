import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../../api/axios.js";
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

      setTicketCode(ticket_code);
      setTimeCreated(timeCreated);
      setSiteName(site_name);
      setSiteStatus(status_site);
      setTicketStatus(status_ticket);
      setTotalTicket(counter);
      setResponseText(responseText);

      for (let i = 0; i < problemCode.length; i++) {
        // ... other code ...
        const problemId = problemCode[i];
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
    const responseText = document.getElementById("responseText").value;
    console.log("response text : " + responseText + " " + ticketCode);

    const payloadUpdate = {
      ticket_code: ticketCode,
      responseTicket: responseText,
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
                  <label className="col-sm-2 col-form-label">Site Name</label>
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
                  <label className="col-sm-2 col-form-label">Site Status</label>
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
                    <input
                      id="ticketStatus"
                      type="text"
                      className="form-control"
                      // placeholder="open"
                      readOnly
                      value={ticketStatus}
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
                      value={totalTicket}
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
                      value={problemList.join("\n")}
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
                      value={solutionList.join("\n")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Response</label>
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
  );
}

export default ResponChild;
