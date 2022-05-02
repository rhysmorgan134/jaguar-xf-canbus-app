import React, {useEffect} from 'react';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Settings from "./components/settings/Settings";
import Climate from "./components/climate/climate";
import VehicleInfo from "./components/vehicleInfo/VehicleInfo";
import './App.css';
import Nav from "./components/nav/Nav";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core"
import {makeStyles, responsiveFontSizes} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import {socketConnectT, disconnect} from "./actions";
import {useComponentWillMount} from "./helpers/componetWillMountHelper";
import Carplay from "./components/carplay/carplay";

//const electron = window.require("electron");





const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    nav: {
        marginTop: 'auto'
    }
}));

function App({socketConnectT, appDetails}) {

    const classes = useStyles();
    const prefersDarkMode =  appDetails.dark//useMediaQuery('(prefers-color-scheme: dark)')
    console.log(appDetails)


    let theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    background : {
                        default: prefersDarkMode ? '#121212' : '#eeeeee',
                        paper: prefersDarkMode ? '#2e2e2e' : '#fafafa'
                    },
                    secondary: {
                        main: '#3dedf4', dark: 'ff00ee'
                    },
                    MuiIcon: {
                        root: {
                            fontSize: '100px',
                        },
                    },
                },
                overrides: {
                    MuiCssBaseline: {
                        '@global': {
                            '*': {
                                'scrollbar-width': 'thin',
                            },
                            '*::-webkit-scrollbar': {
                                width: '4px',
                                height: '4px',
                            }
                        }
                    }
                }
            }),
                [prefersDarkMode]
    )

    theme = responsiveFontSizes(theme);

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
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <Box className={classes.root} >
                <HashRouter>
                    <Box style={{height: '100vh', overflow: 'hidden'}} className={`${classes.content}`}>
                        <Switch>
                            <Route exact path="/" component={Carplay}/>
                            <Route exact path='/carplay' component={Carplay} />
                            <Route exact path="/climate" component={Climate}/>
                            <Route exact path="/vehicle" component={VehicleInfo}/>
                            <Route exact path="/settings" component={Settings}/>
                        </Switch>
                    </Box>
                    {appDetails.currentPage==='carplay' ? <div></div> : <Nav />}
                </HashRouter>
            </Box>
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
