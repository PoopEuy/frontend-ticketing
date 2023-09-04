import React from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarSamping() {
  return (
    <nav className="pcoded-navbar">
      <div className="sidebar_toggle">
        <a href="/#">
          <i className="icon-close icons" />
        </a>
      </div>
      <div className="pcoded-inner-navbar main-menu">
        <div className>
          <div className="main-menu-header">
            <img
              className="img-80 img-radius"
              src="assets/images/avatar-4.jpg"
              alt="User-Profile-Gambar"
            />
            <div className="user-details">
              <span id="more-details">
                User XXX
                <i className="fa fa-caret-down" />
              </span>
            </div>
          </div>
          <div className="main-menu-content">
            <ul>
              <li className="more-details">
                <a href="user-profile.html">
                  <i className="ti-user" />
                  View Profile
                </a>
                <a href="#!">
                  <i className="ti-settings" />
                  Settings
                </a>
                <a href="auth-normal-sign-in.html">
                  <i className="ti-layout-sidebar-left" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="p-15 p-b-0">
          <form className="form-material">
            <div className="form-group form-primary">
              <input
                type="text"
                name="footer-email"
                className="form-control"
                required
              />
              <span className="form-bar" />
              <label className="float-label">
                <i className="fa fa-search m-r-10" />
                Search Friend
              </label>
            </div>
          </form>
        </div> */}
        {/* <div
          className="pcoded-navigation-label"
          data-i18n="nav.category.navigation"
        >
          Layout
        </div> */}
        {/* <ul className="pcoded-item pcoded-left-item">
          <li className="active">
            <a href="/home" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-home" />
                <b>D</b>
              </span>
              <span className="pcoded-mtext" data-i18n="nav.dash.main">
                Dashboard
              </span>
              <span className="pcoded-mcaret" />
            </a>
          </li>
        </ul> */}
        <div className="pcoded-navigation-label" data-i18n="nav.category.forms">
          Forms &amp; Tables
        </div>
        <ul className="pcoded-item pcoded-left-item">
          <li>
            <a href="/SlaGraph" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers" />
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Sla
              </span>
              <span className="pcoded-mcaret" />
            </a>
          </li>
          <li>
            <a href="/CreateTicket" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers" />
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Create Ticket
              </span>
              <span className="pcoded-mcaret" />
            </a>
          </li>
          <li>
            <a href="/ListPage" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers" />
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Ticket List
              </span>
              <span className="pcoded-mcaret" />
            </a>
          </li>
        </ul>
        {/* <ul className="pcoded-item pcoded-left-item">
          <li>
            <a href="/ResponPage" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers" />
                <b>FC</b>
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Response
              </span>
              <span className="pcoded-mcaret" />
            </a>
          </li>
        </ul> */}
        {/* <div className="pcoded-navigation-label" data-i18n="nav.category.forms">
          Chart &amp; Maps
        </div> */}
        {/* <ul className="pcoded-item pcoded-left-item">
          <li>
            <a href="chart.html" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers" />
                <b>FC</b>
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Chart
              </span>
              <span className="pcoded-mcaret" />
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default NavbarSamping;
