import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthorList from "./author/list";
import AuthorEdit from "./author/edit";
import BookList from "./book/list";
import BookEdit from "./book/edit";
import BookCase from "./bookcase";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/author" exact={true} component={AuthorList} />
          <Route path="/author/:id" component={AuthorEdit} />
          <Route path="/book" exact={true} component={BookList} />
          <Route path="/book/:id" component={BookEdit} />
          <Route path="/bookcase" exact={true} component={BookCase} />
        </Switch>
      </Router>
    );
  }
}

export default App;
