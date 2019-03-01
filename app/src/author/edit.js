import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "../AppNavbar";

import api from "../services/api";
import { API_AUTHOR } from "../Constants";

class AuthorEdit extends Component {
  emptyAuthor = {
    name: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      author: this.emptyAuthor
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      try {
        const { data } = await api.get(
          API_AUTHOR + `/${this.props.match.params.id}`
        );

        this.setState({ author: data });
      } catch (error) {
        this.props.history.push("/");
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let author = { ...this.state.author };
    author[name] = value;
    this.setState({ author });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { author } = this.state;

    if (author.id) await api.put(API_AUTHOR + `/${author.id}`, author);
    else await api.post(API_AUTHOR, author);

    this.props.history.push("/author");
  }

  render() {
    const { author } = this.state;
    const title = <h2>{author.id ? "Editar Autor" : "Novo Autor"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Nome</Label>
              <Input
                type="text"
                name="name"
                id="name"
                required
                value={author.name || ""}
                onChange={this.handleChange}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Salvar
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/author">
                Cancelar
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(AuthorEdit);
