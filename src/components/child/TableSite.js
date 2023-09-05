import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../../api/axios.js";

// import "bootstrap/dist/css/bootstrap.css";
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

import { useNavigate } from "react-router-dom";
function TableSite() {
  const [ticketDatas, setTicketData] = useState([]);
  const [ecomData, setEcomData] = useState([]);
  const [linduData, setLinduData] = useState([]);

  let navigate = useNavigate();
  const routeChange = (data) => {
    navigate("/ResponPage", { state: { data: data } });
    navigate(0);
  };

  useEffect(() => {
    getTicketData();
    getEcomTicket();
    getLinduTicket();
  }, []);

  const getTicketData = async () => {
    const response = await instanceBackEnd.get("getAllTicket");
    console.log("dataTicketRes : " + response.data.data);
    setTicketData(response.data.data);
  };

  const getEcomTicket = async () => {
    const response = await instanceBackEnd.get("getOpenEcom");
    console.log("ekomTicket : " + response.data.data);
    setEcomData(response.data.data);
  };

  const getLinduTicket = async () => {
    const response = await instanceBackEnd.get("getOpenLindu");
    console.log("linduTicket : " + response.data.data);
    setLinduData(response.data.data);
  };

  //allTicket
  const STORY_HEADERS: TableColumnType<ArrayElementType>[] = [
    {
      prop: "ticket_code",
      title: "Ticket",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "ts",
      title: "Created",
      isSortable: true,
    },
    {
      prop: "site_name",
      title: "Site",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "status_site",
      title: "Status Sites",
      isSortable: true,
    },
    {
      prop: "status_ticket",
      title: "Status Ticket",
      isSortable: true,
      isFilterable: true,
    },

    {
      prop: "counter",
      title: "Jumlah",
      isSortable: true,
    },
    {
      prop: "problem_id",
      title: "Problem Code",
    },
    {
      prop: "response",
      title: "Response",
    },
    {
      prop: "button",
      title: "Action", // Added a title for the button column
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          // onClick={routeChange}
          // onClick={() => {
          //   alert(`${row.site_name}'ticket : ${row.ticket_code}`);
          // }}
          onClick={() => routeChange(row)}
        >
          Response
        </Button>
        // <Link to="/ResponPage" className="link">
        //   Response
        // </Link>
      ),
    },
  ];

  //ecomTicket
  const STORY_HEADERS_ECOM: TableColumnType<ArrayElementType>[] = [
    {
      prop: "ticket_code",
      title: "Ticket",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "ts",
      title: "Created",
      isSortable: true,
    },
    {
      prop: "site_name",
      title: "Site",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "status_site",
      title: "Status Sites",
      isSortable: true,
    },
    {
      prop: "status_ticket",
      title: "Status Ticket",
      isSortable: true,
      isFilterable: true,
    },

    {
      prop: "counter",
      title: "Jumlah",
      isSortable: true,
    },
    {
      prop: "problem_id",
      title: "Problem Code",
    },
    {
      prop: "response",
      title: "Response",
    },
    {
      prop: "provinsi",
      title: "Provinsi",
    },
    {
      prop: "button",
      title: "Action", // Added a title for the button column
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          // onClick={routeChange}
          // onClick={() => {
          //   alert(`${row.site_name}'ticket : ${row.ticket_code}`);
          // }}
          onClick={() => routeChange(row)}
        >
          Response
        </Button>
        // <Link to="/ResponPage" className="link">
        //   Response
        // </Link>
      ),
    },
  ];

  //linduTicket
  const STORY_HEADERS_LINDU: TableColumnType<ArrayElementType>[] = [
    {
      prop: "ticket_code",
      title: "Ticket",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "ts",
      title: "Created",
      isSortable: true,
    },
    {
      prop: "site_name",
      title: "Site",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "status_site",
      title: "Status Sites",
      isSortable: true,
    },
    {
      prop: "status_ticket",
      title: "Status Ticket",
      isSortable: true,
      isFilterable: true,
    },

    {
      prop: "counter",
      title: "Jumlah",
      isSortable: true,
    },
    {
      prop: "problem_id",
      title: "Problem Code",
    },
    {
      prop: "response",
      title: "Response",
    },
    {
      prop: "provinsi",
      title: "Provinsi",
    },
    {
      prop: "button",
      title: "Action", // Added a title for the button column
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          // onClick={routeChange}
          // onClick={() => {
          //   alert(`${row.site_name}'ticket : ${row.ticket_code}`);
          // }}
          onClick={() => routeChange(row)}
        >
          Response
        </Button>
        // <Link to="/ResponPage" className="link">
        //   Response
        // </Link>
      ),
    },
  ];

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
      {/* Page-header end */}
      <div className="pcoded-inner-content">
        {/* Main-body start */}
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body">
              {/* Basic table card start */}
              {/* allMitra */}
              <div className="card" id="AllTicket">
                <div className="card-header">
                  <h5>Ticket List</h5>
                  {/* <span>
                    use class <code>table</code> inside table element
                  </span> */}
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li>
                        <i className="fa fa fa-wrench open-card-option" />
                      </li>
                      {/* <li>
                        <i className="fa fa-window-maximize full-card" />
                      </li> */}
                      <li>
                        <i className="fa fa-plus minimize-card" />
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
                <div className="card-block table-border-style hide-ticket-list">
                  <div className="table-responsive">
                    {" "}
                    {/* Added a container around the content */}
                    <DatatableWrapper
                      body={ticketDatas}
                      headers={STORY_HEADERS}
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

                        {/* <Col
                          xs={12}
                          sm={6}
                          lg={6}
                          className="d-flex flex-col justify-content-end align-items-end"
                        >
                          <Pagination paginationRange={4} />
                        </Col> */}
                      </Row>
                      <Table>
                        <TableHeader />
                        <TableBody />
                      </Table>
                      <Row className="mb-4 p-2">
                        <Col xs={12} sm={6} lg={6} className="d-flex flex-col">
                          <Pagination paginationRange={4} />
                        </Col>
                      </Row>
                    </DatatableWrapper>
                  </div>
                </div>
              </div>

              {/* ecom */}
              <div className="card" id="ecomTicket">
                <div className="card-header">
                  <h5>Ticket List - Ecom</h5>
                  {/* <span>
                    use class <code>table</code> inside table element
                  </span> */}
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li>
                        <i className="fa fa fa-wrench open-card-option" />
                      </li>
                      {/* <li>
                        <i className="fa fa-window-maximize full-card" />
                      </li> */}
                      <li>
                        <i className="fa fa-plus minimize-card" />
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
                <div className="card-block table-border-style hide-ticket-list">
                  <div className="table-responsive">
                    {" "}
                    {/* Added a container around the content */}
                    <DatatableWrapper
                      body={ecomData}
                      headers={STORY_HEADERS_ECOM}
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

                        {/* <Col
                          xs={12}
                          sm={6}
                          lg={6}
                          className="d-flex flex-col justify-content-end align-items-end"
                        >
                          <Pagination paginationRange={4} />
                        </Col> */}
                      </Row>
                      <Table>
                        <TableHeader />
                        <TableBody />
                      </Table>
                      <Row className="mb-4 p-2">
                        <Col xs={12} sm={6} lg={6} className="d-flex flex-col">
                          <Pagination paginationRange={4} />
                        </Col>
                      </Row>
                    </DatatableWrapper>
                  </div>
                </div>
              </div>

              {/* lindu */}
              <div className="card" id="linduTicket">
                <div className="card-header">
                  <h5>Ticket List - Lindu</h5>
                  {/* <span>
                    use class <code>table</code> inside table element
                  </span> */}
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li>
                        <i className="fa fa fa-wrench open-card-option" />
                      </li>
                      {/* <li>
                        <i className="fa fa-window-maximize full-card" />
                      </li> */}
                      <li>
                        <i className="fa fa-plus minimize-card" />
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
                <div className="card-block table-border-style hide-ticket-list">
                  <div className="table-responsive">
                    {" "}
                    {/* Added a container around the content */}
                    <DatatableWrapper
                      body={linduData}
                      headers={STORY_HEADERS_LINDU}
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

                        {/* <Col
                          xs={12}
                          sm={6}
                          lg={6}
                          className="d-flex flex-col justify-content-end align-items-end"
                        >
                          <Pagination paginationRange={4} />
                        </Col> */}
                      </Row>
                      <Table>
                        <TableHeader />
                        <TableBody />
                      </Table>
                      <Row className="mb-4 p-2">
                        <Col xs={12} sm={6} lg={6} className="d-flex flex-col">
                          <Pagination paginationRange={4} />
                        </Col>
                      </Row>
                    </DatatableWrapper>
                  </div>
                </div>
              </div>
            </div>
            {/* Page-body end */}
          </div>
        </div>
        {/* Main-body end */}
        <div id="styleSelector"></div>
      </div>
    </div>
  );
}

export default TableSite;
