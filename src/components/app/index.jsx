import React, {Component} from 'react'
import {HashRouter as Router, Route, Link, IndexRoute, Switch} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Jugadores from '../jugadores'
import Equipos from '../equipos'
import Home from '../home'
import Jugador from '../jugador'
import NotFound from '../notfound'
import styles from './app.css'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.toggleDrawer = this
            .toggleDrawer
            .bind(this)
    }

    toggleDrawer() {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        return (
            <div>
                <AppBar
                    title="HandballStars Admin"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleDrawer}/>
                <Drawer
                    docked={false}
                    width={300}
                    onRequestChange={this.toggleDrawer}
                    open={this.state.open}>
                    <AppBar title="HandballStars" onLeftIconButtonTouchTap={this.toggleDrawer}/>

                    <MenuItem
                        primaryText="Jugadores"
                        value="jugadores"
                        containerElement={< Link to = "/jugadores" replace />}
                        onTouchTap={() => {
                        this.toggleDrawer()
                    }}/>
                    <MenuItem
                        primaryText="Equipos"
                        value="equipos"
                        containerElement={< Link to = "/equipos" replace />}
                        onTouchTap={() => {
                        this.toggleDrawer()
                    }}/>
                </Drawer>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/jugadores" component={Jugadores}/>
                    <Route exact path="/jugadores/add" component={Jugador}/>
                    <Route exact path="/jugador/:idJugador" component={Jugador}/>
                    <Route exact path="/equipos" component={Equipos}/>
                    <Route component={NotFound}/>
                </Switch>

            </div>
        )
    }
}

export default App