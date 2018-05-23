import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { reposAction } from './actions/reposAction';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from './components/Search';
import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React App to talk to Github</h1>
        </header>
        <MuiThemeProvider>
          <div className="App-body">
            <Search />
            <Results />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
