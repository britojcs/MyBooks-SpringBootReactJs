import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./AppNavbar";
import { Container } from "reactstrap";

class Home extends Component {
  render() {
    const message = <h2>Bem vindo!</h2>;

    return (
      <div>
        <AppNavbar />
        <Container fluid>{message}</Container>
      </div>
    );
  }
}

export default Home;
