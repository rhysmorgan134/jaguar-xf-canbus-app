import React, {Component} from 'react';
import JMuxer from 'jmuxer';
import io from 'socket.io-client'
import Carplay from 'react-js-carplay'

const {ipcRenderer} = window;


class CarplayWindow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: false,
            playing: false,
            start: null,
            settings: {
                fps: 60
            }
        }

        this.socket = io('http://localhost:3000')
    }

    componentDidMount() {

        this.socket.on('connect', () => {
            console.log('connected in carplay :)')
        })

        ipcRenderer.on('plugged', () => {
            this.setState({status: true})
        })

        ipcRenderer.on('unplugged', () => {
            this.setState({status: false})
        })

        ipcRenderer.send('statusReq')

        ipcRenderer.on('quit', () => {
            this.props.history.push('/climate')
        })
    }

    render() {

        const leave = () => {
    	    this.props.history.push('/climate')
        }

        const touchEvent = (type, x, y) => {
            ipcRenderer.send('click', {type: type, x: x, y: y})
        }

        const changeSetting = (k, v) => {
            console.log("setting: " + k + " change to: " + v)
        }

        const reload = () => {
            console.log("reload request")
        }


        return (
            <div style={{height: '100%', flexGrow: 1}}>
                <Carplay
                    settings={this.state.settings}
                    status={this.state.status}
                    touchEvent={touchEvent}
                    changeSetting={changeSetting}
                    reload={reload}
                    ws={this.ws}
                    type={'socket.io'}
                />
                    {this.state.status ?
                        <div></div> : <div onClick={leave} style={{marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', flexGrow: '1'}}>CONNECT IPHONE TO BEGIN CARPLAY</div>}
            </div>
        );
    }
}

export default CarplayWindow;
