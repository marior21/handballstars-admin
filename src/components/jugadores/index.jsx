import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {Link} from 'react-router-dom'
import styles from './jugadores.css'

class Jugadores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datosCargados: false,
            jugadores: []
        }
    }
    componentWillMount() {
        fetch('http://localhost:50792/api/Jugadores', {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow'
        }).then((response) => {
            return response.json()
        }).then((losJugadores) => {
            this.setState({jugadores: losJugadores, datosCargados: true})
        })
    }
    render() {
        let listItems = this
            .state
            .jugadores
            .map((jugador) => <ListItem
                containerElement={< Link to = {{ pathname: `/jugador/${jugador.Id}`, state: { jugador: jugador } }}/>}
                key={jugador.Id}
                primaryText={jugador.Nombre + ' ' + jugador.Apellidos}/>)

        let contenido = this.state.datosCargados
            ? <div>
                    <List>{listItems}</List>
                </div>

            : <div>
                <CircularProgress size={80} thickness={5}/>
            </div>
        return (
            <div>
                <Paper className={styles.Contenido} elevation={4}>
                    {contenido}
                </Paper>
                <FloatingActionButton containerElement={< Link to = "/jugadores/add" />}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        )
    }
}

export default Jugadores