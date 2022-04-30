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
            },
            connected: false
        }

        this.socket = io('http://localhost:3000')
    }

    componentDidMount() {

        this.socket.on('connect', this.connect.bind(this))

        ipcRenderer.on('plugged', this.plugged.bind(this))

        ipcRenderer.on('unplugged', this.unplugged.bind(this))

        ipcRenderer.send('statusReq')

        ipcRenderer.on('quit', this.quit.bind(this))
    }

    componentWillUnmount() {
        this.socket.off('connect', this.connect)
        ipcRenderer.removeAllListeners()
        this.socket.disconnect(true)
    }

    plugged() {
        console.log("setting plugged")
        this.setState({status: true})
    }

    unplugged() {
        console.log("setting unplugged")
        this.setState({status: false})
    }

    connect() {
        console.log('connected in carplay :)')
        this.setState({connected: true})
    }

    quit() {
        console.log("leaving quit")
        this.props.leave()
    }

    render() {

        const leave = () => {
            console.log("leaving")
    	    this.props.leave()
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
                {this.state.connected ?
                <Carplay
                    settings={this.state.settings}
                    status={this.state.status}
                    touchEvent={touchEvent}
                    changeSetting={changeSetting}
                    reload={reload}
                    ws={this.socket}
                    type={'socket.io'}
                /> : <div>loading</div>}
                    {this.state.status ?
                        <div></div> : <div onClick={leave} style={{marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', flexGrow: '1'}}>CONNECT IPHONE TO BEGIN CARPLAY</div>}
            </div>
        );
    }
}

export default CarplayWindow;
