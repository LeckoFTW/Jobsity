import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import FormTabs from './components/FormTabs';
import JSONEditor from './components/JSONEditor';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const muiTheme = getMuiTheme({
    palette : {
        primary1Color : '#EAF4DC',
        accent1Color : '#AED578'
    },
    tabs: {
        primary1Color :'#D1E9B5',
        textColor : '#555555',
        alternateTextColor : '#555555',
        selectedTextColor : '#555555',
    },
    inkBar: {
        backgroundColor: '#AED578'
    },
    raisedButton : {
        primaryColor : '#AED578',
        secondaryColor: '#555456'
    }
});

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