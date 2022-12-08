import React, {Component} from 'react';

import { Link } from 'react-router-dom'
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import Container from '@mui/material/Container';
import NavButton from '../common/NavButton'



class Nav extends Component {
    state = {
        currentNav: 'climate'
    };

    navChange = (event, value) => {
        // this.props.history.push('/' + value)
    };

    render() {
        return (
            <Container position="fixed" >
                <BottomNavigation value={this.state.currentNav} onChange={this.navChange} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
                    <NavButton name={'carplay'}/>
                    <NavButton name={'climate'}/>
                    <NavButton name={'vehicle'}/>
                    <NavButton name={'settings'}/>
                </BottomNavigation>
            </Container>
        );
    }
}

export default Nav;