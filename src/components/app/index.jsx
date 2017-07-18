import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Jugadores from '../jugadores'
import Equipos from '../equipos'

class App extends Component {
    constructor() {
        super()
    }

    render() {
        return (           
                <Router>
                    <div>
                    <Route exact path="/" component={Jugadores}/>
                    <Route path="/jugadores" component={Jugadores}/> 
                    <Route path="/equipos" component={Equipos}/> 
                    </div>
                </Router>
        )
    }
}

export default App