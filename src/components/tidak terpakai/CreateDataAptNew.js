import React, { useState, useEffect } from "react";
import { instanceBECreateJson } from "../../api/axios.js";
import NavbarMenu from "../child/NavbarHeader.js";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Modal, Button } from "react-bootstrap";

const CreateDataAptNew = () => {
  const [showResult, setShowResult] = useState(false);
  const [popupResult, setPopupResult] = useState([]);

  // const handleCloseResult = () => setShowResult(false);

  useEffect(() => {
    startForm();
  }, []);

  const startForm = async () => {
    console.log("start");

    //day
    let day_selected = new Date().getDate(); // current day
    let option = "";
    let day = "";

    for (let i = 1; i < 32; i++) {
      // value day number adding 0. 01 02 03 04..
      day = i <= 9 ? "0" + i : i;
      // or value day number 1 2 3 4..
      // day = i;
      let selected = i === day_selected ? " selected" : "";
      option +=
        '<option value="' + day + '"' + selected + ">" + day + "</option>";
    }
    document.getElementById("startDate").innerHTML = option;
    document.getElementById("endDate").innerHTML = option;

    //month
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month_selected = new Date().getMonth(); // current month
    let option_month = "";
    // let month_value = "";
    option_month = '<option value="">Month</option>'; // first option

    for (let i = 0; i < months.length; i++) {
      let month_number = i + 1;

      // 1, set option value month number adding 0. [01 02 03 04..]
      // month_value = (month_number <= 9) ? '0' + month_number : month_number;

      // 2 , or set option value month number. [1 2 3 4..]
      // month_value = month_number;

      // 3, or set option value month names. [January February]
      // month_value = months[i];

      let selected = i === month_selected ? " selected" : "";
      option_month +=
        '<option value="' +
        month_number +
        '"' +
        selected +
        ">(" +
        month_number +
        ") " +
        months[i] +
        "</option>";
    }
    document.getElementById("month").innerHTML = option_month;

    //year
    let year_satart = 1940;
    let year_end = new Date().getFullYear(); // current year
    let year_selected = new Date().getFullYear();

    let option_year = "";
    for (let i = year_satart; i <= year_end; i++) {
      let selected = i === year_selected ? " selected" : "";
      option_year +=
        '<option value="' + i + '"' + selected + ">" + i + "</option>";
    }
    document.getElementById("year").innerHTML = option_year;
  };

  const handleClick = (e) => {
    console.log("Button Create");
    getData();
  };

  const handleCloseResult = (e) => {
    console.log("Close !!");

    setShowResult(false);
    document.getElementById("siteName").value = "";
    document.getElementById("minBatt").value = "";
    document.getElementById("maxBatt").value = "";
  };

  const getData = async () => {
    try {
      const siteName = document.getElementById("siteName").value;
      const minBatt = Number(document.getElementById("minBatt").value);
      const maxBatt = Number(document.getElementById("maxBatt").value);
      const startDate = Number(document.getElementById("startDate").value);
      const endDate = Number(document.getElementById("endDate").value);
      const month = Number(document.getElementById("month").value);
      const year = Number(document.getElementById("year").value);

      const payload = {
        site: siteName,
        startDate: startDate,
        endDate: endDate,
        month: month,
        year: year,
        minBatteryVoltage: minBatt,
        maxBatteryVoltage: maxBatt,
      };

      console.log("instanceBECreateJson");
      const res = await instanceBECreateJson.post("aptNew", payload);
      const msg = await res.data.message;

      const time_data =
        startDate + "-" + month + " sampai" + endDate + "-" + month;
      if (msg === "success") {
        console.log("get berhasil");
        createJson(res, time_data);
      } else {
        console.log("get gagal");
      }
    } catch (error) {
      // alert("GAGAL CHECK BATT VOLT");
      console.log("GAGAL ");
    }
  };

  const createJson = async (res, time_data) => {
    const json_data = res.data.data;
    const siteRes = await res.data.site;
    const fileName = siteRes + "-" + time_data + ".json";
    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
    //show popup message
    const ress_messages = "Create Data Berhasil : " + fileName;
    setPopupResult(ress_messages);
    setShowResult(true);
  };

  return (
    <div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <NavbarMenu />
        </div>
      </div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1>APT NEW CREATE DATA</h1>
          {/* <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Site Name
            </label>
            <Form.Control type="text" placeholder="Site Name" id="siteName" />
          </div> */}
          <div className="input-group mb-3">
            <Row className="col sm row">
              <Form.Group as={Col} controlId="siteName">
                <Form.Label>Site Name</Form.Label>
                <Form.Control type="text" placeholder="Contoh : Affang" />
              </Form.Group>
            </Row>
          </div>
          <div className="input-group mb-3">
            <Row className="col sm row">
              <Form.Group as={Col} controlId="minBatt">
                <Form.Label>Min Battery Voltage</Form.Label>
                <Form.Control type="text" placeholder="Contoh : 52.34" />
              </Form.Group>

              <Form.Group as={Col} controlId="maxBatt">
                <Form.Label>Min Battery Voltage</Form.Label>
                <Form.Control type="text" placeholder="Contoh : 53.34" />
              </Form.Group>
            </Row>
          </div>
          <div className="input-group mb-3">
            <Row className="col sm row">
              <Form.Group as={Col} controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="month">
                <Form.Label>Month</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </div>
          <div className="input-group mb-3">
            <button
              type="button"
              className="btn btn-secondary"
              id="createData"
              onClick={handleClick}
            >
              Create Data
            </button>
          </div>
        </div>
      </div>
      <Modal show={showResult} onHide={handleCloseResult}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <b>{popupResult}</b>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateDataAptNew;
