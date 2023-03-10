import React, { useState } from "react";
import { instanceBackEnd } from "../api/axios.js";
import Spinner from "react-bootstrap/Spinner";
// import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

var baris = 0;
// var check_selesai = 0;
var count_restart = 0;
var addressing_loop;
var set_address_stats;
var num_of_device;
var device_address_list;
var set_status;
var status_setFrame;
var element_frame;
var element_loading;
var div_selesai;
let percentRoot = null;
let max_voltage;
let min_voltage;
let total_cell;
let recti_current;
let frame_input;
let rectiSetting = "none";
let running_program = "true";
let stop_msg;
let test_count;
let reCharge = false;

function FrameList() {
  const [showPassword1, modalPassword1] = useState(false);
  const handleClose = () => modalPassword1(false);

  const [showPassword2, modalPassword2] = useState(false);
  const handleClose2 = () => modalPassword2(false);

  const [inputdata, SetInputdata] = useState({
    kode_frame: "",
    // status: "",
  });
  // const [visible, setVisible] = React.useState(false);
  const [inputarr, setInputarr] = useState([]);

  function changehandle(e) {
    SetInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  let { kode_frame } = inputdata;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // document.getElementById("addFrame").click();
      max_voltage = document.getElementById("max_voltage").value;
      min_voltage = document.getElementById("min_voltage").value;
      total_cell = document.getElementById("total_cell").value;
      recti_current = document.getElementById("recti_current").value;

      console.log("max_voltage : " + max_voltage);
      console.log("min_voltage : " + min_voltage);
      console.log("total_cell : " + total_cell);
      console.log("recti_current : " + recti_current);

      if (
        max_voltage !== "" ||
        min_voltage !== "" ||
        total_cell !== "" ||
        recti_current !== ""
      ) {
        console.log("check password");
        modalPassword1(true);
      } else {
        console.log("luanjut");
        getMframByFrame();
      }
    }
  };

  //checkpassword_awal
  const check_password_awal = async () => {
    console.log("CHeck Password");
    const password_recti1 = document.getElementById("password_recti1").value;
    console.log("password_recti1 : " + password_recti1);

    try {
      const payload = {
        username: "teknisi",
        password: password_recti1,
      };
      const res = await instanceBackEnd.post("/login", payload);
      const pass1Msg = res.data.msg;
      console.log("pass1Msg : " + pass1Msg);
      if (pass1Msg === "USER_LOGGED_IN_SUCCESSFULLY") {
        console.log("login sukses");

        modalPassword1(false);
        getMframByFrame();
      } else {
        console.log("login gagal");
        const label_p1 = document.getElementById("label_p1");
        label_p1.style.display = "block";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMframByFrame = async () => {
    try {
      const payload = {
        frame_sn: kode_frame,
      };

      const res = await instanceBackEnd.post("getMframByFrame", payload);
      const data = await res.data.data;

      console.log(data, "data");

      if (data === null) {
        // await addFrame();
        if (baris === 0) {
          await restartCMS();
        } else {
          await addFrame();
        }
      } else {
        // alert("FRAME SUDAH TERDAFTAR, HARAP SCAN KODE FRAME YANG BERBEDA");
        test_count = await data.test_count;
        let text = "FRAME SUDAH TERDAFTAR, APAKAH ANDA INGIN CHARGE ULANG?";
        if (window.confirm(text) === true) {
          console.log("OK");
          chargeUlang();
        } else {
          console.log("CANCEL");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //udpdate mframe untuk charget ulang
  const chargeUlang = async () => {
    test_count = test_count + 1;

    const payload = {
      frame_sn: kode_frame,
      result: "",
      status_test: true,
      status_checking: false,
      test_count: test_count,
    };
    const res = await instanceBackEnd.patch("updateMframeByFrame", payload);

    const statusUpdate = await res.data.msg;
    console.log("statusUpdate : " + statusUpdate);

    reCharge = true;
    console.log("reCharge :" + reCharge);
    if (statusUpdate === "update success") {
      await restartCMS();
    } else {
      alert("GAGAL UPDATE MFRAME SAAT INGIN RECHARGE");
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
      // document.getElementById("kode_frame").value = "";
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
      frame_input = input_value.kode_frame;
      const input_bid = device_address_list[i];

      if (i === 0) {
        console.log("set frame pertama");
        await setFrame(input_bid, i);
      } else if (i > 0 && status_setFrame === 1) {
        setTimeout(await setFrame(input_bid, i), 500);
      } else {
      }
    }
  }
  async function settingRecti() {
    console.log("setting recti");
    if (rectiSetting === "none") {
      document.getElementById("setting_div").style.display = "block";
      rectiSetting = "block";
    } else {
      document.getElementById("setting_div").style.display = "none";
      rectiSetting = "none";
    }
  }

  const setFrame = async (input_bid, i) => {
    console.log(input_bid, "input_bid");
    try {
      const payload = {
        bid: input_bid,
        frame_write: 1,
        frame_name: frame_input,
      };

      const res = await instanceBackEnd.post("setFrameCMS", payload);

      const data = await res.data.data;
      status_setFrame = data.status;
      console.log("status_setFrame = " + status_setFrame);

      if (status_setFrame === 1 && i === 0) {
        setTimeout(
          await function () {
            setDataCollection();
            console.log("sukses set frame, masuk set data collection");
          },
          1000
        );
      } else if (status_setFrame === 1) {
        console.log("sukses set frame");
        if (reCharge === true) {
          setTimeout(
            await function () {
              validateTime();
            },
            1000
          );
        } else {
          await createTableFrame();
        }
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

  const setDataCollection = async () => {
    try {
      const payload = {
        data_collection: 1,
      };

      const res = await instanceBackEnd.post("setDataCollection", payload);
      const data = await res.data.data;
      const status_dacol = data.status;

      if (status_dacol === 1) {
        // UpdateMFrameStatus();
        if (reCharge === true) {
          setTimeout(
            await function () {
              validateTime();
            },
            1000
          );
        } else {
          await createTableFrame();
        }
      } else {
        alert("FAILED SET STATUS DATA COLLETION!!");
        window.location.reload();
      }
    } catch (error) {
      alert("ERROR SET DATA COLLETION!!");
      window.location.reload();
    }
  };

  const createTableFrame = async () => {
    try {
      const payload = {
        frame_sn: frame_input,
      };

      const res = await instanceBackEnd.post("CreateTable", payload);

      const data = await res.data;
      const msg = data.msg;

      if (msg === "success") {
        console.log("SUKSES CREATE TABLE = " + msg);
        await createMframe();
      } else {
      }
    } catch (error) {
      alert(
        "ERROR CREATED DATA TABLE! MOHON PERIKSA KONEKSI RMS DAN PERANGKAT ANDA"
      );
      window.location.reload();
    }
  };

  const createMframe = async () => {
    try {
      const payload = {
        frame_sn: frame_input,
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
        //     getStatusCharging();
        //   },
        //   10000
        // );

        setTimeout(
          await function () {
            validateTime();
          },
          1000
        );
      } else {
        alert("CREATE MFRAME GAGAL! HARAP COBA KEMBALI ");
      }
    } catch (error) {
      alert("ERROR CREATE FRAME");
    }
  };

  //validasi waktu
  const validateTime = async () => {
    console.log("masuk validate time");
    try {
      const res = await instanceBackEnd.get("validate-time");

      const time_msg = await res.data.msg;
      console.log("time message : " + time_msg);

      if (time_msg === "TIME_IS_OVER") {
        alert("WAKTU CHARGE SUDAH BERAKHIR, HARAP COBA KEMBALI BESOK!");
        deleteFrame();
      } else {
        console.log("Lanjut program");
        checkBatteryVoltage();
      }
    } catch (error) {
      alert("GAGAL VALIDASI WAKTU");
    }
  };

  //delete mframe
  const deleteFrame = async () => {
    console.log("delete mframe");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.post("deletebyMframe", payload);

      const delete_msg = await res.data.msg;
      console.log("delete_msg : " + delete_msg);
      if (delete_msg === "mframe_deleted") {
        deleteFrameTable();
      } else {
        alert("GAGAL DELETE FRAME");
      }
    } catch (error) {
      alert("GAGAL DELETE FRAME");
    }
  };

  const deleteFrameTable = async () => {
    console.log("delete mframe table");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.post("deleteTableFrame", payload);

      const deletet_msg = await res.data.msg;
      console.log("deletetable_msg : " + deletet_msg);
      if (deletet_msg === "table_deleted") {
        alert("FRAME BERHASIL DI HAPUS");
        window.location.reload();
      } else {
        alert("ERROR DELETE TABLE");
      }
    } catch (error) {
      alert("GAGAL DELETE TABLE FRAME");
    }
  };

  //check battery voltage
  const checkBatteryVoltage = async () => {
    console.log("check batt volt : ");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.post("check-battery-voltage", payload);
      const batt_msg = await res.data.msg;
      console.log("batt_msg : " + batt_msg);

      if (batt_msg === "BATTERY_NOT_FULLY_CHARGED") {
        console.log("TURN-ON recti");
        powerOnRectifier();
      } else {
        // alert("BATERAI SUDAH PENUH");
        // window.location.reload();
        // powerOnRectifier();
        stop_msg = "PROGRAM BERHENTI, BATERAI SUDAH PENUH";
        updateResultStatus();
      }
    } catch (error) {
      alert("GAGAL CHECK BATT VOLT");
    }
  };

  //turn-on recti
  const powerOnRectifier = async () => {
    console.log("powerOnRectifier");
    element_loading.style.display = "none";
    try {
      const res = await instanceBackEnd.get("power-module-rectifier/true");
      const recpower_msg = await res.data.msg;
      console.log("recpower_msg : " + recpower_msg);
      if (recpower_msg === "POWER_MODULE_RECTIFIER_TURN_ON") {
        insertDefaultSetting();
      } else {
        alert(recpower_msg);
      }
    } catch (error) {
      alert("GAGAL TURN ON RECTI");
      deleteFrame();
    }
  };

  //getcms
  const getCms = async () => {
    console.log("masuk getCms  ");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.post("cms-data", payload);
      const cms_msg = await res.data.msg;
      console.log("cms_msg : " + cms_msg);
      if (
        cms_msg === "DIFFERENT_VOLTAGE_CELL_OK" &&
        running_program === "true"
      ) {
        console.log("ambil rect data");
        rectifierData();
      } else if (
        cms_msg === "DIFFERENT_VOLTAGE_CELL_OK" &&
        running_program === "false"
      ) {
        stop_msg = "PROGRAM DI HENTIKAN";
        updateResultStatus();
      } else if (cms_msg === "DIFFERENT_VOLTAGE_CELL_TOO_HIGH") {
        console.log("stop recti");
        // alert("PERBEDAAN VOLTAGE TERLALU BESAR");

        stop_msg = "PROGRAM BERHENTI, PERBEDAAN VOLTAGE TERLALU BESAR";
        updateResultStatus();
      } else {
        getCms();
      }
    } catch (error) {
      // alert("GAGAL GET CMS, PROGRAM BERHENTI");
      console.log("GAGAL GET CMS, PROGRAM BERHENTI");
      setTimeout(
        await function () {
          getCms();
        },
        1000
      );
    }
  };

  //stop recti process (update status)
  const updateResultStatus = async () => {
    console.log("updateResultTest  ");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.put("update-result-status", payload);
      const statusResult_msg = await res.data.msg;
      console.log("statusResult_msg : " + statusResult_msg);
      if (statusResult_msg === "UPDATE_RESULT_STATUS_SUCCESS") {
        updateStatusTest();
      } else {
        alert("GAGAL UPDATE RESULT TEST !!!");
      }
    } catch (error) {
      alert("GAGAL UPDATE RESULT TEST");
    }
  };

  const updateStatusTest = async () => {
    console.log("updateStatusTest  ");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.put("update-status-test", payload);
      const statusTest_msg = await res.data.msg;
      console.log("statusTest_msg : " + statusTest_msg);
      if (statusTest_msg === "UPDATE_STATUS_TEST_SUCCESS") {
        updateStatusChecking();
      } else {
        alert("GAGAL UPDATE STATUS TEST !!!");
      }
    } catch (error) {
      alert("GAGAL UPDATE STATUS TEST");
    }
  };

  const updateStatusChecking = async () => {
    console.log("updateStatusChecking  ");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.put("update-status-checking", payload);
      const statusCheck_msg = await res.data.msg;
      console.log("statusCheck_msg : " + statusCheck_msg);
      if (statusCheck_msg === "UPDATE_STATUS_CHECKING_SUCCESS") {
        powerOffRectifier();
      } else {
        alert("GAGAL UPDATE CHECK TEST !!!");
      }
    } catch (error) {
      alert("GAGAL UPDATE CHECK TEST");
    }
  };

  //stop recti process (turnoff recti)
  const powerOffRectifier = async () => {
    console.log("powerOffRectifier");
    try {
      const res = await instanceBackEnd.get("power-module-rectifier/:false");
      const recpowerOff_msg = await res.data.msg;
      console.log("recpowerOff_msg : " + recpowerOff_msg);

      if (recpowerOff_msg === "POWER_MODULE_RECTIFIER_TURN_OFF") {
        endProgram();
      } else {
      }
    } catch (error) {
      alert("GAGAL TURN OFF RECTI");
    }
  };
  const insertDefaultSetting = async () => {
    console.log("insertDefaultSetting");
    try {
      const payload = {
        maxVoltage: max_voltage,
        minVoltage: min_voltage,
        totalCell: total_cell,
        current: recti_current,
      };

      const res = await instanceBackEnd.post("insert-default-setting", payload);
      const recDefaultStatus = await res.data.status;
      console.log("recDefaultStatus" + recDefaultStatus);

      if (recDefaultStatus === true) {
        setRectifierCurrent();
      } else {
        alert("GAGAL INSERT SETTING");
        deleteFrame();
      }
    } catch (error) {
      alert("GAGAL INSERT RECTI");
    }
  };

  const setRectifierCurrent = async () => {
    console.log("setRectifierCurrent");
    try {
      // const payload = {
      //   current: 40,
      // };
      const payload = {
        current: recti_current,
      };
      const res = await instanceBackEnd.post("set-rectifier-current", payload);
      const rec_status = await res.data.status;
      const rec_code = await res.data.code;
      console.log("rec_status : " + rec_status);

      if (rec_code === 200 && rec_status === true) {
        setRectifierVoltage();
      } else {
      }
    } catch (error) {
      alert("GAGAL SET CURRENT RECTI");
    }
  };

  const setRectifierVoltage = async () => {
    console.log("setRectifierVoltage");
    try {
      // const payload = {
      //   maxVoltage: 3600,
      //   totalCell: 32,
      // };
      const payload = {
        maxVoltage: max_voltage,
        minVoltage: min_voltage,
        totalCell: total_cell,
      };
      const res = await instanceBackEnd.post("set-rectifier-voltage", payload);
      const recVolt_status = await res.data.status;
      const recVolt_code = await res.data.code;
      console.log("recVolt_status : " + recVolt_status);

      if (recVolt_code === 200 && recVolt_status === true) {
        getCms();
        // window.location.reload();
      } else {
      }
    } catch (error) {
      alert("GAGAL SET RECTI VOLTAGE");
    }
  };

  //get rect data
  const rectifierData = async () => {
    console.log("powerOffRectifier");
    try {
      const res = await instanceBackEnd.get("rectifier-data");
      const recData_msg = await res.data.msg;
      console.log("recData_msg : " + recData_msg);
      if (
        recData_msg === "INSERT_RECTIFIER_DATA_SUCCESS" &&
        running_program === "true"
      ) {
        // checkBatt();
        totalBattVolt();
      } else if (
        recData_msg === "INSERT_RECTIFIER_DATA_SUCCESS" &&
        running_program === "false"
      ) {
        stop_msg = "PROGRAM DI HENTIKAN";
        updateResultStatus();
      } else {
        alert("GAGAL GET RECTI DATA !!!");
      }
    } catch (error) {
      // alert("GAGAL GET RECTI DATA");
      console.log("GAGAL GET RECTI DATA");
      setTimeout(
        await function () {
          getCms();
        },
        1000
      );
    }
  };

  //proses loading charge
  const totalBattVolt = async () => {
    console.log("totalBattVolt");
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.post("total-battery-valtage", payload);
      const chargePercent = await res.data.msg;
      console.log("chargePercent : " + chargePercent);

      showprogress(chargePercent);
    } catch (error) {
      alert("GAGAL GET PERSEN");
    }
  };

  const showprogress = async (chargePercent) => {
    console.log("percentRoot : " + percentRoot);
    if (!percentRoot) {
      percentRoot = ReactDOMClient.createRoot(
        document.getElementById("percentRoot")
      );
      console.log("percentRoot 2: " + percentRoot);
    }

    const elementPercent = (
      <div className="col-md-12 text-center">
        <label
          className="label"
          style={{ textAlign: "center", fontSize: "30px" }}
        >
          Charging Sedang Berjalan
        </label>
        <p style={{ textAlign: "center", fontSize: "30px", color: "green" }}>
          {chargePercent} %
        </p>

        <button
          id="stop_process"
          className="button is-success"
          onClick={stopProcess}
        >
          STOP CHARGING PROCESS
        </button>
      </div>
    );
    percentRoot.render(elementPercent);
    console.log("percentRoot 3: " + percentRoot);

    checkBatt();
  };

  const checkBatt = async () => {
    try {
      const payload = {
        frame_sn: frame_input,
      };
      const res = await instanceBackEnd.post("check-battery-voltage", payload);
      const batt_msg = await res.data.msg;
      console.log("batt_msg : " + batt_msg);

      if (
        batt_msg === "BATTERY_NOT_FULLY_CHARGED" &&
        running_program === "true"
      ) {
        console.log("batterai belum penuh, next check time");
        validateTimeLanjutan();
      } else if (
        batt_msg === "BATTERY_NOT_FULLY_CHARGED" &&
        running_program === "false"
      ) {
        stop_msg = "PROGRAM DI HENTIKAN";
        updateResultStatus();
      } else {
        // alert("BATERAI SUDAH PENUH");

        stop_msg = "PROGRAM BERHENTI, BATERAI SUDAH PENUH";
        updateResultStatus();
      }
    } catch (error) {
      alert("GAGAL CHECK BATT VOLT");
    }
  };

  //validasi waktu lanjutan
  const validateTimeLanjutan = async () => {
    console.log("masuk validateTimeLanjutan");
    try {
      const res = await instanceBackEnd.get("validate-time");

      const time_msg = await res.data.msg;
      console.log("time message : " + time_msg);

      if (time_msg === "TIME_IS_NOT_OVER" && running_program === "true") {
        getCms();
        console.log("GET CMS");
      } else if (
        time_msg === "TIME_IS_NOT_OVER" &&
        running_program === "false"
      ) {
        stop_msg = "PROGRAM DI HENTIKAN";
        updateResultStatus();
      } else {
        stop_msg = "PROGRAM BERHENTI, WAKTU HABIS";
        updateResultStatus();
        console.log("WAKTU HABIS");
      }
    } catch (error) {
      alert("GAGAL VALIDASI WAKTU LANJUTAN");
    }
  };

  //SAVE RECTI
  const save_recti = async () => {
    console.log("save recti");
    max_voltage = document.getElementById("max_voltage").value;
    min_voltage = document.getElementById("min_voltage").value;
    total_cell = document.getElementById("total_cell").value;
    recti_current = document.getElementById("recti_current").value;

    console.log("max_voltage : " + max_voltage);
    console.log("min_voltage : " + min_voltage);
    console.log("total_cell : " + total_cell);
    console.log("recti_current : " + recti_current);

    if (
      max_voltage !== "" ||
      min_voltage !== "" ||
      total_cell !== "" ||
      recti_current !== ""
    ) {
      console.log("check password");
      modalPassword2(true);
    } else {
    }
  };

  //checkpassword_dua
  const check_password_dua = async () => {
    console.log("CHeck Password2");
    const password_recti2 = document.getElementById("password_recti2").value;
    console.log("password_recti2 : " + password_recti2);

    try {
      const payload = {
        username: "teknisi",
        password: password_recti2,
      };
      const res = await instanceBackEnd.post("/login", payload);

      const pass1Msg = res.data.msg;
      console.log("pass1Msg : " + pass1Msg);
      if (pass1Msg === "USER_LOGGED_IN_SUCCESSFULLY") {
        console.log("login sukses save recti");

        modalPassword2(false);

        const label_p2 = document.getElementById("label_p2");
        label_p2.style.display = "none";
        saveRectifierCurrent();
      } else {
        console.log("login gagal");
        const label_p2 = document.getElementById("label_p2");
        label_p2.style.display = "block";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveRectifierCurrent = async () => {
    console.log("saveRectifierCurrent");
    try {
      // const payload = {
      //   current: 40,
      // };
      const payload = {
        current: recti_current,
      };
      const res = await instanceBackEnd.post("set-rectifier-current", payload);
      const saveRec_status = await res.data.status;
      const saveRec_code = await res.data.code;
      console.log("saveRec_status : " + saveRec_status);

      if (saveRec_code === 200 && saveRec_status === true) {
        saveRectifierVoltage();
      } else {
      }
    } catch (error) {
      alert("GAGAL SAVE CURRENT RECTI");
    }
  };

  const saveRectifierVoltage = async () => {
    console.log("saveRectifierVoltage");
    try {
      // const payload = {
      //   maxVoltage: 3600,
      //   totalCell: 32,
      // };
      const payload = {
        maxVoltage: max_voltage,
        minVoltage: min_voltage,
        totalCell: total_cell,
      };
      const res = await instanceBackEnd.post("set-rectifier-voltage", payload);
      const saveRecVolt_status = await res.data.status;
      const saveRecVolt_code = await res.data.code;
      console.log("saveRecVolt_status : " + saveRecVolt_status);

      if (saveRecVolt_code === 200 && saveRecVolt_status === true) {
        alert("SUKSES SAVE RECTI VOLTAGE");
      } else {
      }
    } catch (error) {
      alert("GAGAL SAVE RECTI VOLTAGE");
    }
  };

  //FORCE STOP PROGRAM
  const stopProcess = async () => {
    console.log("FORCE STOP PROCESS");
    running_program = "false";
  };
  //PROGRAM SELESAI
  const endProgram = async () => {
    const div_percent = document.getElementById("percent_div");
    div_percent.style.display = "none";

    try {
      const payload = {
        frame_sn: frame_input,
      };

      const res = await instanceBackEnd.post("getMframByFrame", payload);
      const status_checking = await res.data.data.status_checking;

      const data_result = await res.data.data.result;
      const root = ReactDOMClient.createRoot(
        document.getElementById("result_root")
      );

      console.log(status_checking, "status_checking");
      div_selesai.style.display = "block";

      if (data_result === "PASS" || data_result === "pass") {
        const element = (
          <div>
            <br />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>
              {stop_msg}
            </h1>
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>
              RESULT :
              <span
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  color: "green",
                }}
              >
                {" "}
                {data_result}
              </span>
            </h1>
          </div>
        );
        root.render(element);
      } else {
        const element = (
          <div>
            <br />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>
              {stop_msg}
            </h1>
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>
              RESULT :
              <span
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  color: "red",
                }}
              >
                {" "}
                {data_result}
              </span>
            </h1>
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
          <div className="row" style={{ marginBottom: "20px" }}>
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
            <button
              id="setting_button"
              className="button is-success"
              onClick={settingRecti}
            >
              Setting Recti
            </button>
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
            {/* <div style={{ display: "none" }} id="loading_charging">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <p>
                Charging Sedang Berjalan...<span id="percentRoot"></span>{" "}
              </p>
            </div> */}
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
        <div
          className="column is-half"
          id="setting_div"
          style={{ display: "none" }}
        >
          <div className="control" style={{ width: "100%" }}>
            <div className="control" style={{ width: "100%" }}>
              <label
                className="label"
                style={{ textAlign: "left", fontSize: "20px" }}
              >
                Recti Setting
              </label>
            </div>
          </div>
          <div className="control" style={{ width: "100%" }}>
            <div style={{ width: "45%", float: "left" }}>
              <label className="label">Max Voltage</label>
              <input
                id="max_voltage"
                type="number"
                name="max_voltage"
                className="input"
              />
            </div>

            <div style={{ width: "45%", float: "right" }}>
              <label className="label">Total Cell</label>
              <input
                id="total_cell"
                type="number"
                name="total_cell"
                className="input"
              />
            </div>
          </div>
          <div className="control" style={{ width: "100%" }}>
            <div style={{ width: "45%", float: "left" }}>
              <label className="label">Min Voltage</label>
              <input
                id="min_voltage"
                type="number"
                name="min_voltage"
                className="input"
              />
            </div>
            <div style={{ width: "45%", float: "right" }}>
              <label className="label">Recti Current</label>
              <input
                id="recti_current"
                type="number"
                name="recti_current"
                className="input"
              />
            </div>
          </div>
          <div className="control" style={{ width: "100%" }}>
            <div
              className="control"
              style={{ width: "45%", float: "left", marginTop: "10px" }}
            >
              <button
                id="save_recti"
                className="button is-success"
                onClick={save_recti}
              >
                SAVE RECTI
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="columns mt-5 is-centered" id="percent_div">
        <div id="percentRoot"></div>
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

      {/* modal */}
      <div className="columns mt-5 is-centered">
        <Modal show={showPassword1}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>
              <p>PEMERIKSAAN ADMIN!</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="label">PASSWORD</label>
            <input
              id="password_recti1"
              type="password"
              name="password_recti1"
              className="input"
            />
            <div
              id="label_p1"
              className="label"
              style={{ color: "red", display: "none" }}
            >
              <label>PASSWORD SALAH</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={check_password_awal}>
              Check Password
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="columns mt-5 is-centered">
        <Modal show={showPassword2}>
          <Modal.Header closeButton onClick={handleClose2}>
            <Modal.Title>
              <p>PEMERIKSAAN ADMIN!</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="label">PASSWORD</label>
            <input
              id="password_recti2"
              type="password"
              name="password_recti2"
              className="input"
            />
            <div
              id="label_p2"
              className="label"
              style={{ color: "red", display: "none" }}
            >
              <label>PASSWORD SALAH</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={check_password_dua}>
              Check Password
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FrameList;
