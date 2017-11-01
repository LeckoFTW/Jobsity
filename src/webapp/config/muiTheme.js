/**
 * @author Andres Felipe Gonzalez
 * */
'use strict';

/* Dependencies declaration */
/* Material design */
import { getMuiTheme } from 'material-ui/styles';

/* Exports the global material design components configuration*/
export default getMuiTheme({
  palette: {
    primary1Color: '#EAF4DC',
    accent1Color: '#AED578'
  },
  tabs: {
    primary1Color: '#D1E9B5',
    textColor: '#555555',
    alternateTextColor: '#555555',
    selectedTextColor: '#555555',
  },
  inkBar: {
    backgroundColor: '#AED578'
  },
  raisedButton: {
    primaryColor: '#AED578',
    secondaryColor: '#555456'
  }
});
