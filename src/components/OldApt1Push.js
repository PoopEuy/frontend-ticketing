import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../api/axios.js";
import { Modal, Button } from "react-bootstrap";
import NavbarMenu from "./child/NavbarMenu.js";

// import { json } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import FrameTableList from "./child/FrameTableList.js";

const OldApt1Push = () => {
  const [masterSites, setMasterSite] = useState([]);
  const [files, setFiles] = useState([]);
  const [popupSite, setPopupSite] = useState([]);
  const [popupResult, setPopupResult] = useState([]);

  const [show, setShow] = useState(false);
  const [showFalse, setShowFalse] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleClosePush = () => setShow(false);
  const handleCloseFalse = () => setShowFalse(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleCloseResult = () => setShowResult(false);

  useEffect(() => {
    getMasterSites();
  }, []);

  const getMasterSites = async () => {
    const response = await instanceBackEnd.get("getNojsUsers");
    const dataSite = response.data.data;

    setMasterSite(dataSite);
  };

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result);
    };
  };

  const handleClick = (e) => {
    checkFileJson(files);
  };

  const buttonConfirm = (e) => {
    pushDataAptLama();
  };

  const checkFileJson = async (files) => {
    const nojs_select = document.getElementById("inputGroupSelect01");
    const select_val = nojs_select.value;

    if (
      select_val !== "" &&
      document.getElementById("inputGroupFile02").value !== ""
    ) {
      const data_array = JSON.parse(files);
      const file_nojs = data_array[0].nojs;
      const select_nojs = select_val.substring(0, select_val.indexOf("+"));
      const select_site = select_val.slice(select_val.indexOf("+") + 1);
      setPopupSite(select_site);

      if (select_nojs === file_nojs) {
        console.log("lanjut");
        setShow(true);
      } else {
        setShowFalse(true);
        console.log("tidak lanjut");
      }
    } else {
      setShowFilter(true);
    }
  };

  const pushDataAptLama = async () => {
    console.log("masuk push ");
    setShow(false);
    try {
      const payload = {
        data: files,
      };

      const res = await instanceBackEnd.post("pushData", payload);
      const msg = await res.data.message;
      const jumlah_data = await res.data.jumlah;
      console.log("msg : " + msg);
      if (msg === "Data created successfully") {
        console.log("popup berhasil");
        const ress_messages = "Push Data Berhasil : " + jumlah_data + " Data";
        setPopupResult(ress_messages);
        setShowResult(true);
      } else {
        console.log("popup gagal");
        const ress_messages = "Push Data Gagal";
        setPopupResult(ress_messages);
        setShowResult(true);
      }
    } catch (error) {
      // alert("GAGAL CHECK BATT VOLT");
      console.log("GAGAL ");
    }
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
          <div className="input-group mb-3">
            <h1>APT1 OLD PUSH</h1>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Site Name
            </label>
            <select className="form-select" id="inputGroupSelect01">
              <option value="">Select Site</option>
              {masterSites.map((option) => (
                <option
                  key={option.nojs}
                  value={option.nojs + "+" + option.site}
                >
                  {option.site}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="file"
              onChange={handleChange}
              className="form-control"
              id="inputGroupFile02"
            />
            <br />
          </div>

          <div className="input-group mb-3">
            <button
              type="button"
              className="btn btn-secondary"
              id="pushData"
              onClick={handleClick}
            >
              Push Data
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClosePush}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Anda Ingin Push Data Site <b>{popupSite}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePush}>
            Tidak
          </Button>
          <Button variant="primary" onClick={buttonConfirm}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFalse} onHide={handleCloseFalse}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Nama Site Yang Dipilih Tidak Sesuai Dengan File Json
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseFalse}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFilter} onHide={handleCloseFilter}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          HARAP PILIH FILE ATAU SELECT SITE TERLEBIH DAHULU
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseFilter}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

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

export default OldApt1Push;
