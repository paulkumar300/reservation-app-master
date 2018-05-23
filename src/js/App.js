import React, { Component } from 'react';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './component/Header';
import Nav from  './component/Nav';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './store';
import '../css/App.css';

class App extends Component {
  render() {
      const muiTheme = getMuiTheme({
          palette: {
              textColor: cyan500,
          },
      });
      /* create store */
      const initialState = {};
      const store = configureStore(initialState);
    return (
        <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router>
              <div className="App">
                  <Nav>
                      <Header />
                  </Nav>
                  <div className="content">
                      <Routes/>
                  </div>
              </div>
            </Router>
        </MuiThemeProvider>
        </Provider>
    );
  }
}

export default App;
