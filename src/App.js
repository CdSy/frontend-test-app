import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import MainPage from './components/MainPage';
import TablePage from './components/TablePage';
import ErrorPage from './components/ErrorPage';
import NavHeader from './components/Header';
import { Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <NavHeader/>
            <Switch>
              <Route
                  path="/table/:tableName"
                  component={TablePage}
              />
              <Route path="/" exact component={MainPage} />
              <Route path="/404-page" component = { ErrorPage  } />
              <Route component = { ErrorPage  } />
            </Switch>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
