import React, { Component } from "react";
import {
  Button,
  Container,
  Table,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import AppNavbar from "../AppNavbar";
import { withRouter } from "react-router-dom";

import api from "../services/api";
import { API_BOOKCASE } from "../Constants";

class BookCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      weight: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    let weight = { ...this.state.weight };

    weight = value;

    this.setState({ weight });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { weight } = this.state;

    const { data } = await api.get(API_BOOKCASE + `/${weight}`);

    this.setState({ data, isLoading: false });
    console.log(data);
  }

  render() {
    const { data, isLoading, weight } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const list = data.map(book => {
      return (
        <tr key={book.id}>
          <td style={{ whiteSpace: "nowrap" }}>{book.title}</td>
          <td style={{ whiteSpace: "nowrap" }}>{book.author.name}</td>
          <td>{book.price}</td>
          <td>{book.weight}</td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="weight">Capacidade máxima da estante (g)</Label>
              <Input
                type="number"
                name="weight"
                id="weight"
                defaultValue={weight || ""}
                onChange={this.handleChange}
                autoComplete="weight"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Buscar Livros
              </Button>
            </FormGroup>
          </Form>

          {/* {data.length > 0 ? ( */}
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th width="10%">Preço (R$)</th>
                <th width="10%">Peso (g)</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </Table>
          {/* ) : null} */}
        </Container>
      </div>
    );
  }
}

export default withRouter(BookCase);
