import React, { useState, useEffect } from "react";
// import { instanceBECreateJson } from "../api/axios.js";
import NavbarHeader from "./child/NavbarHeader.js";
import NavbarSamping from "./child/NavbarSamping.js";
import PreloadStart from "./child/PreloadStart.js";

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import { Modal, Button } from "react-bootstrap";
// import { json } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import FrameTableList from "./child/FrameTableList.js";

const home = () => {
  return (
    <div>
      {/* Pre-loader start */}
      <div className="theme-loader">
        <PreloadStart />
      </div>

      {/* Pre-loader end */}
      <div id="pcoded" className="pcoded">
        <div className="pcoded-overlay-box" />
        <div className="pcoded-container navbar-wrapper">
          <NavbarHeader />

          <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
              <NavbarSamping />
              <div className="pcoded-content">
                {/* Page-header start */}
                <div className="page-header">
                  <div className="page-block">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="page-header-title">
                          <h5 className="m-b-10">Dashboard</h5>
                          <p className="m-b-0">Welcome to Mega Able</p>
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
                            <a href="#!">Dashboard</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Page-header end */}
                <div className="pcoded-inner-content">
                  {/* Main-body start */}
                  <div className="main-body">
                    <div className="page-wrapper">
                      {/* Page-body start */}
                      <div className="page-body">
                        <div className="row">
                          {/* task, page, download counter  start */}
                          <div className="col-xl-3 col-md-6">
                            <div className="card">
                              <div className="card-block">
                                <div className="row align-items-center">
                                  <div className="col-8">
                                    <h4 className="text-c-purple">$30200</h4>
                                    <h6 className="text-muted m-b-0">
                                      All Earnings
                                    </h6>
                                  </div>
                                  <div className="col-4 text-right">
                                    <i className="fa fa-bar-chart f-28" />
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer bg-c-purple">
                                <div className="row align-items-center">
                                  <div className="col-9">
                                    <p className="text-white m-b-0">% change</p>
                                  </div>
                                  <div className="col-3 text-right">
                                    <i className="fa fa-line-chart text-white f-16" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="card">
                              <div className="card-block">
                                <div className="row align-items-center">
                                  <div className="col-8">
                                    <h4 className="text-c-green">290+</h4>
                                    <h6 className="text-muted m-b-0">
                                      Page Views
                                    </h6>
                                  </div>
                                  <div className="col-4 text-right">
                                    <i className="fa fa-file-text-o f-28" />
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer bg-c-green">
                                <div className="row align-items-center">
                                  <div className="col-9">
                                    <p className="text-white m-b-0">% change</p>
                                  </div>
                                  <div className="col-3 text-right">
                                    <i className="fa fa-line-chart text-white f-16" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="card">
                              <div className="card-block">
                                <div className="row align-items-center">
                                  <div className="col-8">
                                    <h4 className="text-c-red">145</h4>
                                    <h6 className="text-muted m-b-0">
                                      Task Completed
                                    </h6>
                                  </div>
                                  <div className="col-4 text-right">
                                    <i className="fa fa-calendar-check-o f-28" />
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer bg-c-red">
                                <div className="row align-items-center">
                                  <div className="col-9">
                                    <p className="text-white m-b-0">% change</p>
                                  </div>
                                  <div className="col-3 text-right">
                                    <i className="fa fa-line-chart text-white f-16" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="card">
                              <div className="card-block">
                                <div className="row align-items-center">
                                  <div className="col-8">
                                    <h4 className="text-c-blue">500</h4>
                                    <h6 className="text-muted m-b-0">
                                      Downloads
                                    </h6>
                                  </div>
                                  <div className="col-4 text-right">
                                    <i className="fa fa-hand-o-down f-28" />
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer bg-c-blue">
                                <div className="row align-items-center">
                                  <div className="col-9">
                                    <p className="text-white m-b-0">% change</p>
                                  </div>
                                  <div className="col-3 text-right">
                                    <i className="fa fa-line-chart text-white f-16" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* task, page, download counter  end */}
                          {/*  sale analytics start */}
                          <div className="col-xl-8 col-md-12">
                            <div className="card">
                              <div className="card-header">
                                <h5>Sales Analytics</h5>
                                <span className="text-muted">
                                  Get 15% Off on
                                  <a href="https://www.amcharts.com/">
                                    amCharts
                                  </a>
                                  licences. Use code "codedthemes" and get the
                                  discount.
                                </span>
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
                                <div
                                  id="sales-analytics"
                                  style={{ height: "400px" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-12">
                            <div className="card">
                              <div className="card-block">
                                <div className="row">
                                  <div className="col">
                                    <h4>$256.23</h4>
                                    <p className="text-muted">This Month</p>
                                  </div>
                                  <div className="col-auto">
                                    <label className="label label-success">
                                      +20%
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-8">
                                    <canvas
                                      id="this-month"
                                      style={{ height: "150px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card quater-card">
                              <div className="card-block">
                                <h6 className="text-muted m-b-15">
                                  This Quarter
                                </h6>
                                <h4>$3,9452.50</h4>
                                <p className="text-muted">$3,9452.50</p>
                                <h5>87</h5>
                                <p className="text-muted">
                                  Online Revenue
                                  <span className="f-right">80%</span>
                                </p>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-c-blue"
                                    style={{ width: "80%" }}
                                  />
                                </div>
                                <h5 className="m-t-15">68</h5>
                                <p className="text-muted">
                                  Offline Revenue
                                  <span className="f-right">50%</span>
                                </p>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-c-green"
                                    style={{ width: "50%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  sale analytics end */}
                          {/*  project and team member start */}
                          <div className="col-xl-8 col-md-12">
                            <div className="card table-card">
                              <div className="card-header">
                                <h5>Projects</h5>
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
                                <div className="table-responsive">
                                  <table className="table table-hover">
                                    <thead>
                                      <tr>
                                        <th>
                                          <div className="chk-option">
                                            <div className="checkbox-fade fade-in-primary">
                                              <label className="check-task">
                                                <input
                                                  type="checkbox"
                                                  defaultValue
                                                />
                                                <span className="cr">
                                                  <i className="cr-icon fa fa-check txt-default" />
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                          Assigned
                                        </th>
                                        <th>Name</th>
                                        <th>Due Date</th>
                                        <th className="text-right">Priority</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="chk-option">
                                            <div className="checkbox-fade fade-in-primary">
                                              <label className="check-task">
                                                <input
                                                  type="checkbox"
                                                  defaultValue
                                                />
                                                <span className="cr">
                                                  <i className="cr-icon fa fa-check txt-default" />
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="d-inline-block align-middle">
                                            <img
                                              src="assets/images/avatar-4.jpg"
                                              alt="user gambar"
                                              className="img-radius img-40 align-top m-r-15"
                                            />
                                            <div className="d-inline-block">
                                              <h6>John Deo222</h6>
                                              <p className="text-muted m-b-0">
                                                Graphics Designer
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Able Pro</td>
                                        <td>Jun, 26</td>
                                        <td className="text-right">
                                          <label className="label label-danger">
                                            Low
                                          </label>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="chk-option">
                                            <div className="checkbox-fade fade-in-primary">
                                              <label className="check-task">
                                                <input
                                                  type="checkbox"
                                                  defaultValue
                                                />
                                                <span className="cr">
                                                  <i className="cr-icon fa fa-check txt-default" />
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="d-inline-block align-middle">
                                            <img
                                              src="assets/images/avatar-5.jpg"
                                              alt="user gambar"
                                              className="img-radius img-40 align-top m-r-15"
                                            />
                                            <div className="d-inline-block">
                                              <h6>Jenifer Vintage</h6>
                                              <p className="text-muted m-b-0">
                                                Web Designer
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Mashable</td>
                                        <td>March, 31</td>
                                        <td className="text-right">
                                          <label className="label label-primary">
                                            high
                                          </label>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="chk-option">
                                            <div className="checkbox-fade fade-in-primary">
                                              <label className="check-task">
                                                <input
                                                  type="checkbox"
                                                  defaultValue
                                                />
                                                <span className="cr">
                                                  <i className="cr-icon fa fa-check txt-default" />
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="d-inline-block align-middle">
                                            <img
                                              src="assets/images/avatar-3.jpg"
                                              alt="user gambar"
                                              className="img-radius img-40 align-top m-r-15"
                                            />
                                            <div className="d-inline-block">
                                              <h6>William Jem</h6>
                                              <p className="text-muted m-b-0">
                                                Developer
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Flatable</td>
                                        <td>Aug, 02</td>
                                        <td className="text-right">
                                          <label className="label label-success">
                                            medium
                                          </label>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="chk-option">
                                            <div className="checkbox-fade fade-in-primary">
                                              <label className="check-task">
                                                <input
                                                  type="checkbox"
                                                  defaultValue
                                                />
                                                <span className="cr">
                                                  <i className="cr-icon fa fa-check txt-default" />
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="d-inline-block align-middle">
                                            <img
                                              src="assets/images/avatar-2.jpg"
                                              alt="user gambar"
                                              className="img-radius img-40 align-top m-r-15"
                                            />
                                            <div className="d-inline-block">
                                              <h6>David Jones</h6>
                                              <p className="text-muted m-b-0">
                                                Developer
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Guruable</td>
                                        <td>Sep, 22</td>
                                        <td className="text-right">
                                          <label className="label label-primary">
                                            high
                                          </label>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div className="text-right m-r-20">
                                    <a
                                      href="#!"
                                      className="b-b-primary text-primary"
                                    >
                                      View all Projects
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-12">
                            <div className="card">
                              <div className="card-header">
                                <h5>Team Members</h5>
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
                                <div className="align-middle m-b-30">
                                  <img
                                    src="assets/images/avatar-2.jpg"
                                    alt="user gambar"
                                    className="img-radius img-40 align-top m-r-15"
                                  />
                                  <div className="d-inline-block">
                                    <h6>David Jones</h6>
                                    <p className="text-muted m-b-0">
                                      Developer
                                    </p>
                                  </div>
                                </div>
                                <div className="align-middle m-b-30">
                                  <img
                                    src="assets/images/avatar-1.jpg"
                                    alt="user gambar"
                                    className="img-radius img-40 align-top m-r-15"
                                  />
                                  <div className="d-inline-block">
                                    <h6>David Jones</h6>
                                    <p className="text-muted m-b-0">
                                      Developer
                                    </p>
                                  </div>
                                </div>
                                <div className="align-middle m-b-30">
                                  <img
                                    src="assets/images/avatar-3.jpg"
                                    alt="user gambar"
                                    className="img-radius img-40 align-top m-r-15"
                                  />
                                  <div className="d-inline-block">
                                    <h6>David Jones</h6>
                                    <p className="text-muted m-b-0">
                                      Developer
                                    </p>
                                  </div>
                                </div>
                                <div className="align-middle m-b-30">
                                  <img
                                    src="assets/images/avatar-4.jpg"
                                    alt="user gambar"
                                    className="img-radius img-40 align-top m-r-15"
                                  />
                                  <div className="d-inline-block">
                                    <h6>David Jones</h6>
                                    <p className="text-muted m-b-0">
                                      Developer
                                    </p>
                                  </div>
                                </div>
                                <div className="align-middle m-b-10">
                                  <img
                                    src="assets/images/avatar-5.jpg"
                                    alt="user gambar"
                                    className="img-radius img-40 align-top m-r-15"
                                  />
                                  <div className="d-inline-block">
                                    <h6>David Jones</h6>
                                    <p className="text-muted m-b-0">
                                      Developer
                                    </p>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <a
                                    href="#!"
                                    className="b-b-primary text-primary"
                                  >
                                    View all Projects
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  project and team member end */}
                        </div>
                      </div>
                      {/* Page-body end */}
                    </div>
                    <div id="styleSelector" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
