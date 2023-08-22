import React from "react";
import "bootstrap/dist/css/bootstrap.css";
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

import TABLE_BODY from "./data.json";

type ArrayElementType = (typeof TABLE_BODY)[number] & {
  button: any,
};

// Create table headers consisting of 5 columns.
const STORY_HEADERS: TableColumnType<ArrayElementType>[] = [
  {
    prop: "name",
    title: "Name",
    isFilterable: true,
  },
  {
    prop: "username",
    title: "Username",
  },
  {
    prop: "location",
    title: "Location",
  },
  {
    prop: "date",
    title: "Last Update",
  },
  {
    prop: "score",
    title: "Score",
    isSortable: true,
  },
  {
    prop: "button",
    title: "Action", // Added a title for the button column
    cell: (row) => (
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => {
          alert(`${row.username}'s score is ${row.score}`);
        }}
      >
        Click me
      </Button>
    ),
  },
];
const STORY_BODY: ArrayElementType[] = TABLE_BODY;

// Then, use it in a component.
export default function App() {
  return (
    <div className="container">
      {" "}
      {/* Added a container around the content */}
      <DatatableWrapper
        body={STORY_BODY}
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
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Pagination paginationRange={4} />
          </Col>
        </Row>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
      </DatatableWrapper>
    </div>
  );
}
