import React, { useState } from "react";
import { instanceBackEnd } from "../api/axios.js";
import Spinner from "react-bootstrap/Spinner";
// import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import { Link } from "react-router-dom";

var baris = 0;
var check_selesai = 0;
var count_restart = 0;
var addressing_loop;
var set_address_stats;
var num_of_device;
var device_address_list;
var set_status;
var status_setFrame;
var element_frame;
var element_loading;
var loading_charging;
var div_selesai;

function FrameList() {
  const [inputdata, SetInputdata] = useState({
    kode_frame: "",
    // status: "",
  });

  const [inputarr, setInputarr] = useState([]);

  function changehandle(e) {
    SetInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  let { kode_frame } = inputdata;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // document.getElementById("addFrame").click();

      getMframByFrame();
    }
  };

  const getMframByFrame = async () => {
    try {
      const payload = {
        frame_sn: kode_frame,
      };

      const res = await instanceBackEnd.post("getMframByFrame", payload);
      const data = await res.data.data;
      const status = await res.status;

      console.log(data, "data");
      console.log(status, "nilai status");
      if (data === null) {
        // await addFrame();
        if (baris === 0) {
          await restartCMS();
        } else {
          await addFrame();
        }
      } else {
        alert("FRAME SUDAH TERDAFTAR, HARAP SCAN KODE FRAME YANG BERBEDA");

        //   confirm("FRAME SUDAH TERDAFTAR, HARAP SCAN KODE FRAME YANG BERBEDA")
        // ) {
        //   // Save it!
        //   console.log("ok");
        // } else {
        //   // Do nothing!
        //   console.log("cancel");
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restartCMS = async () => {
    try {
      const payload = {
        bid: 255,
        restart: 1,
      };

      const res = await instanceBackEnd.post("restartCMS", payload);
      const restart_status = await res.data.data;
      const data_status = restart_status.status;
      if (data_status === 1) {
        console.log("lanjut getframe data");

        setTimeout(
          await function () {
            addFrame();
          },
          1000
        );
      } else {
        count_restart = count_restart + 1;
        if (count_restart > 3) {
          alert("GAGAL RESTART CMS, HARAP PERIKSA KONEKSI ANDA");
          window.location.reload();
        } else {
          restartCMS();
        }
      }
    } catch (error) {
      alert("GAGAL RESTART CMS, HARAP PERIKSA KONEKSI ANDA");
      window.location.reload();
    }
  };

  async function addFrame() {
    baris = baris + 1;
    console.log("addframe");

    if (baris === 1) {
      console.log("baris 1");
      setInputarr([...inputarr, { kode_frame }]);

      setAddressing();
    } else if (baris > 1) {
      await check_array();
      console.log("baris 2 dst");
    } else {
      console.log("baris error");
    }
  }

  async function check_array() {
    const isFound = inputarr.some((element) => {
      if (element.kode_frame === kode_frame) {
        return true;
      }

      return false;
    });

    if (isFound === false) {
      console.log("ARRAY PASS");
      await setInputarr([...inputarr, { kode_frame }]);
      // await check_jumlah_frame();
      console.log(inputarr, " objek store di array atas");
      setTimeout(
        await function () {
          check_jumlah_frame();
        },
        500
      );
    } else {
      alert("FRAME SUDAH DI SCAN, HARAP SCAN FRAME YANG BERBEDA");
    }
  }

  const setAddressing = async () => {
    try {
      const payload = {
        addr: 1,
      };

      element_frame = document.getElementById("kode_frame");
      element_loading = document.getElementById("loading_address");
      loading_charging = document.getElementById("loading_charging");
      div_selesai = document.getElementById("div_selesai");

      // ✅ Set disabled / hiden attribute
      element_frame.setAttribute("disabled", "");
      element_loading.style.display = "block";

      const res = await instanceBackEnd.post(`setAddressing`, payload);
      addressing_loop = 0;
      const data = await res.data;
      set_address_stats = data.data.status;

      console.log(`set_address_statgs = ${set_address_stats}`);

      if (set_address_stats === 1) {
        setTimeout(() => {
          console.log("LOOP = " + addressing_loop);
          getAddressing();
        }, 1000);
      } else {
        alert("ADDRESSING GAGAL, HARAP COBA KEMBALI");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("ADDRESSING GAGAL, HARAP PERIKSA KONEKSI ANDA");
      window.location.reload();
    }
  };

  const getAddressing = async () => {
    console.log("masuk getAddressing ");
    const res = await instanceBackEnd.get(`getAddressing`);

    set_status = res.data.data.status;
    num_of_device = res.data.data.num_of_device;

    device_address_list = res.data.data.device_address_list;

    console.log(`set_status = ${set_status}`);
    console.log(`num_of_device = ${num_of_device}`);
    console.log(`device_address_list = ${device_address_list}`);
    addressing_loop = addressing_loop + 1;

    if (set_status === 0 && addressing_loop < 10) {
      console.log("LOOP = " + addressing_loop);
      setTimeout(() => {
        getAddressing();
      }, 1000);
    } else if (
      set_status === 1 &&
      num_of_device === 0 &&
      addressing_loop < 10
    ) {
      setTimeout(() => {
        console.log("LOOP = " + addressing_loop);
        getAddressing();
      }, 1000);
    } else if (set_status === 1 && addressing_loop < 11 && num_of_device > 0) {
      console.log("STOP LOOP go to nextstep, Loop =" + addressing_loop);
      document.getElementById("kode_frame").value = "";
      element_frame.removeAttribute("disabled");

      setTimeout(
        await function () {
          check_jumlah_frame();
        },
        500
      );
      // setFrame();
    } else {
      alert(
        "Get ADDRESSING GAGAL! HARAP PERIKSA KONEKSI RMS DAN PERANGKAT ANDA"
      );
      window.location.reload();
    }
  };

  async function check_jumlah_frame() {
    document.getElementById("kode_frame").focus();
    if (baris === num_of_device) {
      console.log("Jumlah frame sesuai jumlah scan");
      const panjang_array = inputarr.length;
      console.log("panjang aray atas = " + panjang_array);
      document.getElementById("save_button").click();
    } else {
      console.log("Lanjut scan" + baris);
    }
  }

  async function save_frame() {
    element_frame.setAttribute("disabled", "");

    console.log(inputarr, " objek store di array ");
    const panjang_array = inputarr.length;
    console.log("panjang aray = " + panjang_array);

    for (let i = 0; i < inputarr.length; i++) {
      const input_value = inputarr[i];
      const input_bid = device_address_list[i];

      console.log("status_setFrame FOR1 = " + status_setFrame);
      if (i === 0) {
        console.log("set frame pertama");
        await setFrame(input_value, input_bid, i);
      } else if (i > 0 && status_setFrame === 1) {
        setTimeout(await setFrame(input_value, input_bid, i), 500);
      } else {
        console.log("status_setFrame FOR2 = " + status_setFrame);
      }
    }
  }

  const setFrame = async (input_value, input_bid, i) => {
    console.log(input_bid, "input_bid");
    try {
      const payload = {
        bid: input_bid,
        frame_write: 1,
        frame_name: input_value.kode_frame,
      };

      const res = await instanceBackEnd.post("setFrameCMS", payload);

      const data = await res.data.data;
      status_setFrame = data.status;
      console.log("status_setFrame = " + status_setFrame);

      if (status_setFrame === 1 && i === 0) {
        setTimeout(
          await function () {
            setDataCollection(input_value);
            console.log("sukses set frame, masuk set data collection");
          },
          1000
        );
      } else if (status_setFrame === 1) {
        console.log("sukses set frame");
        await createTableFrame(input_value);
      } else {
        alert(
          "SET FRAME GAGAL! HARAP PERIKSA KONEKSI RMS DAN PERANGKAT ANDA !!"
        );
      }
    } catch (error) {
      alert(
        "SET FRAME GAGAL! HARAP PERIKSA KONEKSI RMS DAN PERANGKAT ANDA !!!"
      );
    }
  };

  const setDataCollection = async (input_value) => {
    try {
      const payload = {
        data_collection: 1,
      };

      const res = await instanceBackEnd.post("setDataCollection", payload);
      const data = await res.data.data;
      const status_dacol = data.status;

      if (status_dacol === 1) {
        // UpdateMFrameStatus();
        await createTableFrame(input_value);
      } else {
        alert("FAILED SET STATUS DATA COLLETION!!");
        window.location.reload();
      }
    } catch (error) {
      alert("ERROR SET DATA COLLETION!!");
      window.location.reload();
    }
  };

  const createTableFrame = async (input_value) => {
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };

      const res = await instanceBackEnd.post("CreateTable", payload);

      const data = await res.data;
      const msg = data.msg;

      if (msg === "success") {
        console.log("SUKSES CREATE TABLE = " + msg);
        await createMframe(input_value);
      } else {
      }
    } catch (error) {
      alert(
        "ERROR CREATED DATA TABLE! MOHON PERIKSA KONEKSI RMS DAN PERANGKAT ANDA"
      );
      window.location.reload();
    }
  };

  const createMframe = async (input_value) => {
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
        status_test: true, //true = frame dapat di charge
        status_checking: false, // false = frame belum/sedang menjalani charging
      };

      const res = await instanceBackEnd.post("createMframe", payload);

      // const data = await res.data;
      // const status = await res.status;
      const msg = await res.data.msg;

      if (msg === "Created") {
        console.log("Mframe Created");
        // setTimeout(
        //   await function () {
        //     getStatusCharging(input_value);
        //   },
        //   10000
        // );

        setTimeout(
          await function () {
            validateTime(input_value);
          },
          1000
        );
      } else {
        alert("CREATE MFRAME GAGAL! HARAP COBA KEMBALI ");
      }
    } catch (error) {
      alert("FRAME SUDAH TERDAFTAR");
    }
  };

  //validasi waktu
  const validateTime = async (input_value) => {
    console.log("masuk validate time");
    try {
      const res = await instanceBackEnd.get("validate-time");

      const time_msg = await res.data.msg;
      console.log("time message : " + time_msg);
      // deleteFrame(input_value);
      if (time_msg === "TIME_IS_OVER") {
        deleteFrame(input_value);
      } else {
        console.log("Lanjut program");
        checkBatteryVoltage(input_value);
      }
    } catch (error) {
      alert("GAGAL VALIDASI WAKTU");
    }
  };

  //delete mframe
  const deleteFrame = async (input_value) => {
    console.log("delete mframe");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.post("deletebyMframe", payload);

      const delete_msg = await res.data.msg;
      console.log("delete_msg : " + delete_msg);
      if (delete_msg === "mframe_deleted") {
        deleteFrameTable(input_value);
      } else {
        alert("GAGAL DELETE FRAME");
      }
    } catch (error) {
      alert("GAGAL DELETE FRAME");
    }
  };

  const deleteFrameTable = async (input_value) => {
    console.log("delete mframe table");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.post("deleteTableFrame", payload);

      const deletet_msg = await res.data.msg;
      console.log("deletetable_msg : " + deletet_msg);
      if (deletet_msg === "table_deleted") {
        alert("GAGAL VALIDASI WAKTU, HARAP COBA KEMBALI BESOK");
        window.location.reload();
      } else {
        alert("ERROR DELETE TABLE");
      }
    } catch (error) {
      alert("GAGAL DELETE TABLE FRAME");
    }
  };

  //check battery voltage
  const checkBatteryVoltage = async (input_value) => {
    console.log("check batt volt : ");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.post("check-battery-voltage", payload);
      const batt_msg = await res.data.msg;
      console.log("batt_msg : " + batt_msg);

      if (batt_msg === "BATTERY_NOT_FULLY_CHARGED") {
        console.log("TURN-ON recti");
        powerOnRectifier(input_value);
      } else {
        alert("BATERAI SUDAH PENUH");
        // window.location.reload();
        // powerOnRectifier(input_value);
      }
    } catch (error) {
      alert("GAGAL CHECK BATT VOLT");
    }
  };

  //turn-on recti
  const powerOnRectifier = async (input_value) => {
    console.log("powerOnRectifier");
    element_loading.style.display = "none";
    loading_charging.style.display = "block";
    try {
      const res = await instanceBackEnd.get("power-module-rectifier/true");
      const recpower_msg = await res.data.msg;
      console.log("recpower_msg : " + recpower_msg);
      if (recpower_msg === "POWER_MODULE_RECTIFIER_TURN_ON") {
        getCms(input_value);
      } else {
        alert(recpower_msg);
      }
    } catch (error) {
      alert("GAGAL TURN ON RECTI");
    }
  };

  //getcms
  const getCms = async (input_value) => {
    console.log("masuk getCms  ");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.post("cms-data", payload);
      const cms_msg = await res.data.msg;
      console.log("cms_msg : " + cms_msg);
      if (cms_msg === "DIFFERENT_VOLTAGE_CELL_OK") {
        console.log("ambil rect data");
        rectifierData(input_value);
      } else if (cms_msg === "DIFFERENT_VOLTAGE_CELL_TOO_HIGH") {
        console.log("stop recti");
        alert("PERBEDAAN VOLTAGE TERLALU BESAR");
        updateResultStatus(input_value);
      } else {
        getCms(input_value);
      }
    } catch (error) {
      alert("GAGAL GET CMS");
    }
  };

  //stop recti process (update status)
  const updateResultStatus = async (input_value) => {
    console.log("updateResultTest  ");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.put("update-result-status", payload);
      const statusResult_msg = await res.data.msg;
      console.log("statusResult_msg : " + statusResult_msg);
      if (statusResult_msg === "UPDATE_RESULT_STATUS_SUCCESS") {
        updateStatusTest(input_value);
      } else {
        alert("GAGAL UPDATE RESULT TEST !!!");
      }
    } catch (error) {
      alert("GAGAL UPDATE RESULT TEST");
    }
  };

  const updateStatusTest = async (input_value) => {
    console.log("updateStatusTest  ");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.put("update-status-test", payload);
      const statusTest_msg = await res.data.msg;
      console.log("statusTest_msg : " + statusTest_msg);
      if (statusTest_msg === "UPDATE_STATUS_TEST_SUCCESS") {
        updateStatusChecking(input_value);
      } else {
        alert("GAGAL UPDATE STATUS TEST !!!");
      }
    } catch (error) {
      alert("GAGAL UPDATE STATUS TEST");
    }
  };

  const updateStatusChecking = async (input_value) => {
    console.log("updateStatusChecking  ");
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.put("update-status-checking", payload);
      const statusCheck_msg = await res.data.msg;
      console.log("statusCheck_msg : " + statusCheck_msg);
      if (statusCheck_msg === "UPDATE_STATUS_CHECKING_SUCCESS") {
        powerOffRectifier(input_value);
      } else {
        alert("GAGAL UPDATE CHECK TEST !!!");
      }
    } catch (error) {
      alert("GAGAL UPDATE CHECK TEST");
    }
  };

  //stop recti process (turnoff recti)
  const powerOffRectifier = async (input_value) => {
    console.log("powerOffRectifier");
    try {
      const res = await instanceBackEnd.get("power-module-rectifier/:false");
      const recpowerOff_msg = await res.data.msg;
      console.log("recpowerOff_msg : " + recpowerOff_msg);

      if (recpowerOff_msg === "POWER_MODULE_RECTIFIER_TURN_OFF") {
        setRectifierCurrent(input_value);
      } else {
      }
    } catch (error) {
      alert("GAGAL TURN OFF RECTI");
    }
  };

  const setRectifierCurrent = async (input_value) => {
    console.log("setRectifierCurrent");
    try {
      const payload = {
        current: 40,
      };
      const res = await instanceBackEnd.post("set-rectifier-current", payload);
      const rec_status = await res.data.status;
      const rec_code = await res.data.code;
      console.log("rec_status : " + rec_status);

      if (rec_code === 200 && rec_status === true) {
        setRectifierVoltage(input_value);
      } else {
      }
    } catch (error) {
      alert("GAGAL SET CURRENT RECTI");
    }
  };

  const setRectifierVoltage = async (input_value) => {
    console.log("setRectifierVoltage");
    try {
      const payload = {
        maxVoltage: 3600,
        totalCell: 32,
      };
      const res = await instanceBackEnd.post("set-rectifier-voltage", payload);
      const recVolt_status = await res.data.status;
      const recVolt_code = await res.data.code;
      console.log("recVolt_status : " + recVolt_status);

      if (recVolt_code === 200 && recVolt_status === true) {
        alert("PROGRAM DIHENTIKAN");
        endProgram(input_value);
        // window.location.reload();
      } else {
      }
    } catch (error) {
      alert("GAGAL SET RECTI VOLTAGE");
    }
  };

  //get rect data
  const rectifierData = async (input_value) => {
    console.log("powerOffRectifier");
    try {
      const res = await instanceBackEnd.get("rectifier-data");
      const recData_msg = await res.data.msg;
      console.log("recData_msg : " + recData_msg);
      if (recData_msg === "INSERT_RECTIFIER_DATA_SUCCESS") {
        checkBatt(input_value);
      } else {
        alert("GAGAL GET RECTI DATA !!!");
      }
    } catch (error) {
      alert("GAGAL GET RECTI DATA");
    }
  };

  const checkBatt = async (input_value) => {
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };
      const res = await instanceBackEnd.post("check-battery-voltage", payload);
      const batt_msg = await res.data.msg;
      console.log("batt_msg : " + batt_msg);

      if (batt_msg === "BATTERY_NOT_FULLY_CHARGED") {
        console.log("batterai belum penuh, next check time");
        validateTimeLanjutan(input_value);
      } else {
        alert("BATERAI SUDAH PENUH");
        updateResultStatus(input_value);
      }
    } catch (error) {
      alert("GAGAL CHECK BATT VOLT");
    }
  };

  //validasi waktu lanjutan
  const validateTimeLanjutan = async (input_value) => {
    console.log("masuk validateTimeLanjutan");
    try {
      const res = await instanceBackEnd.get("validate-time");

      const time_msg = await res.data.msg;
      console.log("time message : " + time_msg);
      // deleteFrame(input_value);
      if (time_msg === "TIME_IS_OVER") {
        updateResultStatus(input_value);
        console.log("WAKTU HABIS");
      } else {
        getCms(input_value);
        console.log("GET CMS");
      }
    } catch (error) {
      alert("GAGAL VALIDASI WAKTU LANJUTAN");
    }
  };

  //PROGRAM SELESAI
  const endProgram = async (input_value) => {
    try {
      const payload = {
        frame_sn: input_value.kode_frame,
      };

      const res = await instanceBackEnd.post("getMframByFrame", payload);
      const status_checking = await res.data.data.status_checking;

      const data_result = await res.data.data.result;
      const root = ReactDOMClient.createRoot(
        document.getElementById("result_root")
      );

      console.log(status_checking, "status_checking");
      loading_charging.style.display = "none";
      div_selesai.style.display = "block";

      if (data_result === "PASS" || data_result === "pass") {
        const element = (
          <div>
            <br />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>RESULT</h1>
            <h2
              style={{
                textAlign: "center",
                fontSize: "25px",
                color: "green",
              }}
            >
              {data_result}
            </h2>
          </div>
        );
        root.render(element);
      } else {
        const element = (
          <div>
            <br />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>RESULT</h1>
            <h2
              style={{
                textAlign: "center",
                fontSize: "25px",
                color: "red",
              }}
            >
              {data_result}
            </h2>
          </div>
        );
        root.render(element);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <label
            className="label"
            style={{ textAlign: "center", fontSize: "30px" }}
          >
            Battery Charging MERGE
          </label>
          <Link to={"/"} className="button is-success">
            Back
          </Link>
          <div className="field">
            <label className="label">Frame Code</label>
            <div className="control">
              <input
                id="kode_frame"
                type="text"
                name="kode_frame"
                className="input"
                value={inputdata.kode_frame}
                onChange={changehandle}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>

            {/* <label className="label">Status</label>
            <div className="control">
              <input
                type="text"
                name="status"
                className="input"
                value={inputdata.status}
                onChange={changehandle}
              />
            </div> */}
          </div>

          <div className="field">
            <div style={{ display: "none" }} id="loading_address">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </div>
            <div style={{ display: "none" }} id="loading_charging">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Charging Sedang Berjalan...
            </div>
          </div>

          <div className="field">
            {/* <button
              id="addFrame"
              onClick={addFrame}
              className="button is-success"
            >
              Add Frame
            </button> */}
            <button
              id="save_button"
              style={{ display: "none" }}
              onClick={save_frame}
              className="button is-success"
            >
              Save Frame
            </button>
          </div>
        </div>
      </div>
      <div className="columns mt-5 is-centered">
        <div style={{ display: "none" }} id="div_selesai">
          <label
            className="label"
            style={{ textAlign: "center", fontSize: "30px" }}
          >
            Charging Process is Complete
          </label>
        </div>
      </div>
      <div className="columns mt-5 is-centered">
        <div id="result_root"></div>
      </div>

      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Frame Code</th>
              </tr>
            </thead>

            <tbody>
              {inputarr.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{info.kode_frame}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FrameList;
