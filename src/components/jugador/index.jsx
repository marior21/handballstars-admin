import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { ValidatorForm, TextValidator, DateValidator} from 'react-material-ui-form-validator'
import styles from './jugador.css'

class Jugador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: '',
            apellidos: '',
            biografia: '',
            fechaNacimiento: null,
            lugarNacimiento: '',
            puesto: '',
            numero: '',
            peso: '',
            altura: '',
            nacionalidad: ''
        }
        this.handleInputChange = this
            .handleInputChange
            .bind(this)
        this.handleSubmit = this
            .handleSubmit
            .bind(this)
    }

    componentWillMount() {
        if (!this.props.match.params.idJugador) {
            return
        }
        fetch(`http://localhost:50792/api/Jugadores/${this.props.match.params.idJugador}`, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow'
        }).then((response) => {
            return response.json()
        }).then((elJugador) => {
            this.setState({
                nombre: elJugador.Nombre != null ? elJugador.Nombre : '',
                apellidos: elJugador.Apellidos != null ? elJugador.Apellidos : '',
                biografia:  elJugador.Biografia != null ? elJugador.Biografia : '',
                fechaNacimiento: elJugador.FechaNacimiento != null
                    ? new Date(elJugador.FechaNacimiento)
                    : null,
                lugarNacimiento: elJugador.LugarNacimiento != null ? elJugador.LugarNacimiento : '',
                puesto: elJugador.Puesto != null ? elJugador.Puesto : '',
                numero: elJugador.Numero != null
                    ? elJugador.Numero
                    : null,
                peso: elJugador.Peso != null
                    ? elJugador.Peso
                    : null,
                altura: elJugador.Altura != null
                    ? elJugador.Altura
                    : null,
                nacionalidad: elJugador.Nacionalidad != null ? elJugador.Nacionalidad : ''
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let nuevoJugador = {
            Nombre: this.state.nombre,
            Apellidos: this.state.apellidos,
            Biografia: this.state.biografia,
            FechaNacimiento: this.state.fechaNacimiento,
            LugarNacimiento: this.state.lugarNacimiento,
            Puesto: this.state.puesto,
            Numero: this.state.numero,
            Peso: this.state.peso,
            Altura: this.state.altura,
            Nacionalidad: this.state.nacionalidad
        }
        let url = 'http://localhost:50792/api/Jugadores'
        let metodo = 'POST'
        if (this.props.match.params.idJugador) {
            url += `/${this.props.match.params.idJugador}`
            nuevoJugador.Id = this.props.match.params.idJugador
            metodo = 'PUT'
        }

        fetch(url, {
            method: metodo,
            mode: 'cors',
            body: JSON.stringify(nuevoJugador),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this
                .props
                .history
                .push('/jugadores')
        })
    }

    handleInputChange(event, date) {
        if (event) {
            const target = event.target
            const value = target.type === 'checkbox'
                ? target.checked
                : target.value
            const name = target.name

            this.setState({[name]: value})
        } else if (date) {
            this.setState({fechaNacimiento: date})
        }
    }

    render() {
        return (
            <div>
                <ValidatorForm ref='form' className={styles.Formulario} onSubmit={this.handleSubmit}>
                    <div className={styles.Campo}>
                        <TextValidator
                            name='nombre'
                            hintText='Nombre'
                            floatingLabelText='Nombre'
                            validators={['required']}
                            errorMessages={['El campo es obligatorio']}
                            value={this.state.nombre}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className={styles.Campo}>
                        <TextValidator
                            hintText='Apellidos'
                            name='apellidos'
                            floatingLabelText='Apellidos'
                            validators={['required']}
                            errorMessages={['El campo es obligatorio']}
                            value={this.state.apellidos}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className='Campo'>
                        <TextField
                            hintText='Biografía'
                            name='biografia'
                            floatingLabelText='Biografía'
                            multiLine={true}
                            fullWidth={true}
                            rows={12}
                            value={this.state.biografia}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className='Campo'>
                        <DateValidator
                            hintText='Fecha de Nacimiento'
                            name='fechaNacimiento'
                            floatingLabelText='Fecha de Nacimiento'
                            okLabel='Aceptar'
                            cancelLabel='Cancelar'
                            locale='es'
                            DateTimeFormat={global.Intl.DateTimeFormat}
                            value={this.state.fechaNacimiento}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className='Campo'>
                        <TextValidator
                            hintText='Lugar de Nacimiento'
                            name='lugarNacimiento'
                            floatingLabelText='Lugar de Nacimiento'
                            value={this.state.lugarNacimiento}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className='Campo'>
                        <TextValidator
                            hintText='Puesto'
                            name='puesto'
                            floatingLabelText='Puesto'
                            value={this.state.puesto}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className='Campo'>
                        <TextValidator
                            hintText='Número'
                            name='numero'
                            validators={['isNumber']}
                            errorMessages={['El campo debe ser un número']}
                            floatingLabelText='Número'
                            value={this.state.numero}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className='Campo'>
                        <TextValidator
                            hintText='Peso'
                            name='peso'
                            floatingLabelText='Peso'
                            validators={['isNumber']}
                            errorMessages={['El campo debe ser un número']}
                            value={this.state.peso}
                            onChange={this.handleInputChange}/>
                    </div>
                    <br/>
                    <RaisedButton
                        label='Guardar'
                        type='submit'
                        primary={true}
                        icon={< ContentSave />}/>

                </ValidatorForm>
            </div>
        )
    }
}

export default Jugador