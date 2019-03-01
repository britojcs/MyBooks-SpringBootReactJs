import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "../AppNavbar";
import { Link, withRouter } from "react-router-dom";

import api from "../services/api";
import { API_BOOK } from "../Constants";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
    this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const { data } = await api.get(API_BOOK);
      this.setState({ data, isLoading: false });
    } catch (error) {
      this.props.history.push("/");
    }
  }

  async remove(id) {
    await api.delete(API_BOOK + `/${id}`).then(() => {
      let updatedData = [...this.state.data].filter(i => i.id !== id);
      this.setState({ data: updatedData });
    });
  }

  render() {
    const { data, isLoading } = this.state;

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
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/book/" + book.id}
              >
                Editar
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(book.id)}
              >
                Remover
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/book/new">
              Novo
            </Button>
          </div>
          <h3>Livro</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th width="10%">Preço (R$)</th>
                <th width="10%">Peso (g)</th>
                <th width="10%">Ações</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(BookList);
