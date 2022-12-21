import React from 'react';

import { Link } from 'react-router-dom'
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import Container from '@mui/material/Container';
import NavButton from '../common/NavButton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import VolumeUp from '@mui/icons-material/VolumeUp'
import VolumeDown from '@mui/icons-material/VolumeDown'
import {sendAction} from "../../actions";
import { useDispatch, useSelector} from "react-redux";


function Nav () {
    // state = {
    //     currentNav: 'climate'
    // };
    //
    // navChange = (event, value) => {
    //     // this.props.history.push('/' + value)
    // };

    const action = (actionDetails) => {
        dispatch(sendAction(actionDetails))
    }

    const dispatch = useDispatch()

        return (
            <Container position="fixed" >
                <BottomNavigation  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
                    <Grid container columns={18} xs={{height: '100%'}} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={5}>

                        </Grid>
                        <Grid item xs={2}>
                            <NavButton name={'carplay'}/>
                        </Grid>
                        <Grid item xs={2}>
                            <NavButton name={'climate'}/>
                        </Grid>
                        <Grid item xs={2}>
                            <NavButton name={'vehicle'}/>
                        </Grid>
                        <Grid item xs={2} justifyContent={'center'} alignItems={'center'}>
                            <NavButton name={'settings'}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Box />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton>
                                <VolumeDown onTouchStart={() => action({actionName: 'volDown', actionFunction: 'pressed'})}
                                            onTouchEnd={() => action({actionName: 'volDown', actionFunction: 'rel'})}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton>
                                <VolumeUp onTouchStart={() => action({actionName: 'volUp', actionFunction: 'pressed'})}
                                          onTouchEnd={() => action({actionName: 'volUp', actionFunction: 'rel'})}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </BottomNavigation>
            </Container>
        );
}

export default Nav;