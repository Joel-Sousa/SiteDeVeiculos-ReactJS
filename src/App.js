
import React from 'react'
import {createTheme, ThemeProvider} from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routs from './Routes'
import {Provider} from 'react-redux'
import {store} from './store/store'
import {Loading, Notify, Alert} from './view/components'
import './global.css'
import Navigation from './view/navigation';

const theme = createTheme({
  palette:{
    primary:{
      main: '#488E3C'
    }
  },
  props:{
    MuiTextField:{
      variant: 'outlined',
      fullWidth: true
    },
    MuiSelect:{
      variant: 'outlined',
      fullWidth: true
    }
  }
})

const App = () => (
  <Provider store={store}>
  <ThemeProvider theme={theme}>
        <Loading/>
        <Alert/>
        <Notify/>
        <Navigation/>
        <Routs/>
    </ThemeProvider>
  </Provider>
)

export default App;
