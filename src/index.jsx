import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {HashRouter as Router, Route, Link, IndexRoute, hashHistory} from 'react-router-dom'
import App from './components/app'
import Jugadores from './components/jugadores'
import Equipos from './components/equipos'
import styles from './index.css'
// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Root = () => {
    return(
<MuiThemeProvider>
    <Router history={hashHistory}>
        <App />
    </Router>
</MuiThemeProvider>)
}


ReactDOM.render(
   <Root /> , document.getElementById('root'))
