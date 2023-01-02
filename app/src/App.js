import React, {useEffect} from 'react';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Settings from "./components/settings/Settings";
import Climate from "./components/climate/climate";
import VehicleInfo from "./components/vehicleInfo/VehicleInfo";
import './App.css';
import Nav from "./components/nav/Nav";
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {createMuiTheme, CssBaseline} from "@mui/material"
import {socketConnectT, disconnect} from "./actions";
import {useComponentWillMount} from "./helpers/componetWillMountHelper";
import Carplay from "./components/carplay/carplay";
import SwipeableEdgeDrawer from "./components/nav/swipeableNav";
import Camera from "./components/Camera/Camera";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Pam from "./components/pam/Pam";

//const electron = window.require("electron");


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    display: "flex"
};



function App({socketConnectT, appDetails}) {

    const prefersDarkMode =  appDetails.dark//useMediaQuery('(prefers-color-scheme: dark)')

    const connectSocket = () => {
        socketConnectT("localhost:3000")
    }


    useComponentWillMount(connectSocket)

    useEffect(() => {
        return () => {
            disconnect()
        };
    }, []);



    return (
        <ThemeProvider theme={appDetails.general.dark ? darkTheme :lightTheme}>
            <CssBaseline />
            <Container maxWidth={false} disableGutters sx={{height: '100%', maxHeight: '100%'}}>
                <HashRouter>
                    <Container maxWidth={false} disableGutters sx={{height: '100%'}}>
                        <Switch>
                            <Route exact path="/" component={Carplay}/>
                            <Route exact path='/carplay' component={Carplay} />
                            <Route exact path="/climate" component={Climate}/>
                            <Route exact path="/vehicle" component={VehicleInfo}/>
                            <Route exact path="/settings" component={Settings}/>
                        </Switch>
                    </Container>
                    {appDetails.currentPage==='carplay' ? <SwipeableEdgeDrawer /> : <Nav />}

                </HashRouter>
            </Container>
            <Modal
                open={appDetails.general.sensors}
            >
                <Box sx={style}>
                    <Camera />
                    <div>
                        <Pam/>
                    </div>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {appDetails: state.appDetails}
}

export default connect(mapStateToProps, {
    socketConnectT: socketConnectT,
    disconnect: disconnect
})(App);
