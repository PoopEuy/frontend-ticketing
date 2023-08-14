import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarMenu() {
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href="www.google.com">
    //       Data Repair
    //     </a>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="www.google.comnavbarNavAltMarkup"
    //       aria-controls="navbarNavAltMarkup"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    //       <div className="navbar-nav">
    //         <a
    //           className="nav-link active"
    //           aria-current="page"
    //           href="http://localhost:3001/"
    //         >
    //           PUSH APT1 OLD
    //         </a>
    //         <a className="nav-link" href="http://100.10.1.2:3007/">
    //           PUSH APT1 NEW
    //         </a>
    //         <a className="nav-link" href="http://100.10.1.2:3006/">
    //           PUSH APT2
    //         </a>
    //         <a className="nav-link" href="http://192.168.2.89:3000/">
    //           NOC DASHBOARD
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </nav>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="http://192.168.2.89:3000/">NOC DASHBOARD</Nav.Link>
            <NavDropdown title="PUSH DATA" id="basic-nav-dropdown">
              <NavDropdown.Item href="http://100.10.1.2:3007/">
                PUSH APT1 NEW
              </NavDropdown.Item>
              <NavDropdown.Item href="http://100.10.1.2:3006/">
                PUSH APT2
              </NavDropdown.Item>
              <NavDropdown.Item href="/">PUSH APT1 Old</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>

            <NavDropdown title="CREATE DATA" id="basic-nav-dropdown">
              <NavDropdown.Item href="/CreateDataAptNew">
                APT1 & APT 2
              </NavDropdown.Item>
              <NavDropdown.Item href="/CreateDataAptOld">
                APT1 OLD
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
