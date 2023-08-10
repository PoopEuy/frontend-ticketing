import React from "react";

function NavbarMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="www.google.com">
          Data Repair
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="www.google.comnavbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-link active"
              aria-current="page"
              href="http://localhost:3001/"
            >
              PUSH APT1 OLD
            </a>
            <a className="nav-link" href="http://100.10.1.2:3007/">
              PUSH APT1 NEW
            </a>
            <a className="nav-link" href="http://100.10.1.2:3006/">
              PUSH APT2
            </a>
            <a className="nav-link" href="http://192.168.2.89:3000/">
              NOC DASHBOARD
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarMenu;
