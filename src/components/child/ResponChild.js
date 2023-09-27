import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../../api/axios";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";

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
  const [resHistory, setResHistory] = useState([]);

  // const [responseAt, setResponseAt] = useState([]);
  const [isDivVisible, setDivVisibility] = useState(false);

  //popupstatws
  const [showResult, setShowResult] = useState(false);
  const [popupResult, setPopupResult] = useState([]);
  const handleCloseResult = () => setShowResult(false);

  //header table history
  const STORY_RESPONSE_HISTORY: TableColumnType<ArrayElementType>[] = [
    {
      prop: "text",
      title: "Response",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "time",
      title: "Date",
      isSortable: true,
    },
  ];

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
      const resHistory = data.response;
      // const responseAt = data.response_at;

      setTicketCode(ticket_code);
      setTimeCreated(timeCreated);
      setSiteName(site_name);
      setSiteStatus(status_site);

      setTotalTicket(counter);

      if (resHistory === null) {
        console.log("resNUll");
        var arrRessponse = [];

        const addResponse = {
          text: "No Response Yet",
          time: "No Response Yet",
        };

        arrRessponse.push(addResponse);
        setResHistory(arrRessponse);
      } else {
        console.log("res tidak NUll");
        console.log("resHistory : " + resHistory + " " + resHistory.length);
        setResHistory(resHistory);
      }

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
      arr_response: resHistory,
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

  const toggleDiv = () => {
    setDivVisibility(!isDivVisible);
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
                    <div className="card-block">
                      {" "}
                      <h4 className="sub-title">Response History</h4>
                      <div className="form-group row">
                        <div className="col-sm-2 col-form-label">
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light button-center"
                            id="buttonHistory"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="bottom"
                            data-content
                            data-original-title="Primary color states"
                            onClick={toggleDiv}
                          >
                            {isDivVisible ? "Hide" : "Show"} Response History
                          </button>
                        </div>

                        <div className="col-sm-10">
                          {isDivVisible && (
                            <div>
                              <div className="table-responsive">
                                {" "}
                                {/* Added a container around the content */}
                                <DatatableWrapper
                                  body={resHistory}
                                  headers={STORY_RESPONSE_HISTORY}
                                  paginationOptionsProps={{
                                    initialState: {
                                      rowsPerPage: 10,
                                      options: [5, 10, 15, 20],
                                    },
                                  }}
                                >
                                  <Row className="mb-4 p-2">
                                    <Col
                                      xs={12}
                                      lg={4}
                                      className="d-flex flex-col justify-content-end align-items-end"
                                    >
                                      <Filter />
                                    </Col>
                                    <Col
                                      xs={12}
                                      sm={6}
                                      lg={4}
                                      className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                                    >
                                      <PaginationOptions />
                                    </Col>
                                  </Row>
                                  <Table>
                                    <TableHeader />
                                    <TableBody />
                                  </Table>
                                  <Row className="mb-4 p-2">
                                    <Col
                                      xs={12}
                                      sm={6}
                                      lg={6}
                                      className="d-flex flex-col"
                                    >
                                      <Pagination paginationRange={4} />
                                    </Col>
                                  </Row>
                                </DatatableWrapper>
                              </div>
                            </div>
                          )}
                          {/* <textarea
                              id="responseHistory"
                              rows={5}
                              cols={5}
                              className="form-control"
                              // defaultValue={responseText}
                              readOnly
                              value={
                                textReponse + " " + timeResponse.join("\n")
                              }
                            /> */}
                        </div>
                      </div>
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
