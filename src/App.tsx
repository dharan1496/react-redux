import "./App.css";
import { Navbar } from "./component/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Container, Row } from "react-bootstrap";
import { AddTask } from "./component/addTask";
import { Result } from "./component/table";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg="6">
            <AddTask />
            <Result />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
