import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "../AppNavbar";

import api from "../services/api";
import { API_AUTHOR, API_BOOK } from "../Constants";

class BookEdit extends Component {
  emptyBook = {
    title: "",
    price: 0,
    weight: 0,
    author: null
  };
  emptyAuthors = [];

  constructor(props) {
    super(props);

    this.state = {
      book: this.emptyBook,
      authors: this.emptyAuthors
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      try {
        const { data } = await api.get(
          API_BOOK + `/${this.props.match.params.id}`
        );

        this.setState({ book: data });
      } catch (error) {
        this.props.history.push("/");
      }
    }

    try {
      const { data } = await api.get(API_AUTHOR);
      this.setState({ authors: data });
    } catch (error) {
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let book = { ...this.state.book };

    book[name] =
      name === "author"
        ? this.state.authors.find(a => parseInt(a.id) === parseInt(value)) ||
          null
        : value;

    this.setState({ book });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { book } = this.state;

    if (book.id) await api.put(API_BOOK + `/${book.id}`, book);
    else await api.post(API_BOOK, book);

    this.props.history.push("/book");
  }

  render() {
    const { book, authors } = this.state;
    const title = <h2>{book.id ? "Editar Livro" : "Novo Livro"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Título</Label>
              <Input
                type="text"
                name="title"
                id="title"
                required
                value={book.title || ""}
                onChange={this.handleChange}
                autoComplete="title"
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-6 mb-3">
                <Label for="name">Preço</Label>
                <Input
                  type="decimal"
                  name="price"
                  id="price"
                  required
                  value={book.price || ""}
                  onChange={this.handleChange}
                  autoComplete="price"
                />
              </FormGroup>
              <FormGroup className="col-md-6 mb-3">
                <Label for="name">Peso</Label>
                <Input
                  type="decimal"
                  name="weight"
                  id="weight"
                  required
                  value={book.weight || ""}
                  onChange={this.handleChange}
                  autoComplete="weight"
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="name">Autor</Label>
              <Input
                type="select"
                name="author"
                id="author"
                required
                onChange={this.handleChange}
              >
                <option value="">{""}</option>
                {authors.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Salvar
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/book">
                Cancelar
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(BookEdit);
