/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */

/* React */
import React, {Component} from 'react';
import {render} from 'react-dom';
/* Redux */
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
/* Material desing*/
import {MuiThemeProvider} from 'material-ui/styles';
import muiTheme from './config/muiTheme';
/* Components */
import FormTabs from './components/FormTabs';
import Editor from './components/Editor';
/* Styling */
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';
import mockData from './mock';

const store = createStore(reducers, {...mockData}, applyMiddleware(reduxThunk));

/**
 * Main Component
 * */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div id="mainContainer" className="container-fluid fullHeight">
            <div className="col-xs-8 fullHeight">
              <FormTabs/>
            </div>
            <div className="col-xs-4 fullHeight">
              <Editor/>
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

render(
  <App/>,
  document.getElementById('root')
);
