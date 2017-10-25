/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import {MuiThemeProvider} from 'material-ui/styles';
import muiTheme from './config/muiTheme';
import FormTabs from './components/FormTabs';
import JSONEditor from './components/JSONEditor';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.scss';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="container-fluid" style={{marginTop : 50}}>
                        <div className="col-xs-8">
                            <FormTabs/>
                        </div>
                        <div className="col-xs-4">
                            <JSONEditor/>
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