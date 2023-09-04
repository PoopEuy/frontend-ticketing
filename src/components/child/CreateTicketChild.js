import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../../api/axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function CreateTicketChild() {
  const [masterSites, setMasterSite] = useState([]);
  const [problemSelect, setProblem] = useState([]);

  //input state
  const [siteName, setSiteName] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState([]);
  const [siteStatus, setSiteStatus] = useState([]);

  //detailsTicke State
  const [detailsTicket, setDetailsTicket] = useState([]);

  //Openpopup
  const [showTicketOpen, openTicketPopup] = useState(false);
  const [popupResult, setPopupResult] = useState([]);
  const [showCreateTicket, createTicketPopup] = useState(false);

  //closePopUp
  const handleCloseTicket = () => openTicketPopup(false);
  const handleCloseCreate = () => createTicketPopup(false);

  //navigate
  let navigate = useNavigate();

  useEffect(() => {
    getMasterSites();
    getProblemOptions();
  }, []);

  const selectStatus = [
    { value: "warning", label: "warning" },
    { value: "down", label: "down" },
  ];

  const getMasterSites = async () => {
    try {
      const response = await instanceBackEnd.get("getAllSites");
      const dataSite = response.data.data;
      setMasterSite(dataSite);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const getProblemOptions = async () => {
    try {
      const resProblem = await instanceBackEnd.get("getSelect");
      const dataProblem = resProblem.data.data;
      setProblem(dataProblem);
    } catch (error) {
      console.error("Error fetching problem options:", error);
    }
  };

  const handleSelectChange = (selectedValues) => {
    // const banyakProblem = selectedValues.length;
    // const indexProblem = banyakProblem - 1;
    // const problemId = selectedValues[indexProblem].value;
    // const problemLabel = selectedValues[indexProblem].label;
    // setSelectedProblem(problemId);
    // console.log("selectProblem: " + " " + problemId + " " + problemLabel);

    setSelectedProblem(selectedValues);
  };

  const handleSelectSite = (selectedValues) => {
    console.log("SiteSelect");
    console.log("selectedSite: " + selectedValues.value);
    setSiteName(selectedValues.value);
  };

  const handleSelectStatus = (selectedValues) => {
    console.log("StatusSelect");
    console.log("StatusSelect: " + selectedValues.value);
    setSiteStatus(selectedValues.value);
  };

  const goToDetails = () => {
    const dataTikcet = detailsTicket.data;
    navigate("/ResponPage", { state: { data: dataTikcet } });
    navigate(0);
  };

  const handleClick = () => {
    checkTicket(siteName);
  };

  const checkTicket = async (site_name) => {
    try {
      const payload = {
        site_name: site_name,
      };
      const resTicket = await instanceBackEnd.post("checkTicket", payload);
      const counter = await resTicket.data.counter;
      const ticketMsg = await resTicket.data.message;

      setDetailsTicket(resTicket.data);
      console.log("counter : " + counter);
      if (ticketMsg === "no_ticket") {
        console.log("ticket_belum_ada, create_ticket_baru " + site_name);

        createTicket(counter);
      }

      if (ticketMsg === "sukses") {
        const ticket_status = await resTicket.data.data.status_ticket;
        if (ticket_status === "closed") {
          console.log("ticket_sudah_ada, sudah_close, create_ticket_baru");

          createTicket(counter);
        }

        if (ticket_status === "open") {
          const ress_messages = "Harap Selesaikan Tiket Sebelumnya";
          setPopupResult(ress_messages);

          console.log("ticket_sudah_ada, status_open - " + site_name);
          //kirim pesan langsung
          openTicketPopup(true);
        }
      }
    } catch (error) {
      console.error("Error fetching problem options:", error);
    }
  };

  async function createTicket(counter) {
    const responseText = document.getElementById("responseText").value;
    var arrProblemId = [];

    selectedProblem.forEach(function (v) {
      const problemId = v.value;

      arrProblemId.push(problemId);
      console.log("arrProblemId : " + arrProblemId);
    });
    console.log(
      "click : " +
        siteName +
        " " +
        arrProblemId +
        "" +
        siteStatus +
        " " +
        responseText
    );

    try {
      const payload = {
        site_name: siteName,
        status_site: siteStatus,
        status_ticket: "open",
        counter: counter,
        problem_id: arrProblemId,
        response: responseText,
      };
      const resCreateTicket = await instanceBackEnd.post(
        "createTicketManual",
        payload
      );

      createTicketPopup(true);
    } catch (error) {
      console.log("error createTicket!!! ");
    }
  }
  return (
    <div>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="page-header-title">
                <h5 className="m-b-10">Site Trouble Ticket</h5>
                <p className="m-b-0">Create Ticket</p>
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
                  <a href="#!">Create Ticket</a>
                </li>
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
                      <h5>Ticket Form</h5>
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
                      <h4 className="sub-title">Create Ticket</h4>
                      <form>
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Site Name
                          </label>
                          <div className="col-sm-10">
                            <Select
                              id="siteNameSelect"
                              options={masterSites.map((option) => ({
                                value: option.name,
                                label: option.name,
                              }))}
                              onChange={handleSelectSite}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Problem
                          </label>
                          <div className="col-sm-10">
                            <Select
                              id="siteProblemSelect"
                              options={problemSelect.map((option) => ({
                                value: option.problem_id,
                                label: option.problem,
                              }))}
                              isMulti
                              onChange={handleSelectChange}
                            />
                            {/* <div>
                              <ul>
                                {selectedOptions.map((value) => (
                                  <li key={value.value}>{value.label}</li>
                                ))}
                              </ul>
                            </div> */}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Site Status
                          </label>
                          <div className="col-sm-10">
                            <Select
                              options={selectStatus}
                              onChange={handleSelectStatus}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Partner Response
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* modal popup */}
        <Modal show={showTicketOpen} onHide={handleCloseTicket}>
          {/* <Modal.Header closeButton></Modal.Header> */}
          <Modal.Body style={{ textAlign: "center" }}>
            <h5>
              <b>{popupResult}</b>
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseTicket}>
              Cancel
            </Button>
            <Button variant="primary" onClick={goToDetails}>
              Details Ticket
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showCreateTicket} onHide={handleCloseCreate}>
          {/* <Modal.Header closeButton></Modal.Header> */}
          <Modal.Body style={{ textAlign: "center" }}>
            <h5>
              <b>Create Ticket Succes</b>
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseCreate}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default CreateTicketChild;
