import React from 'react';
import { BottomNavigationAction} from "@mui/material";
import { Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit'
import DriveEtaIcon from '@mui/icons-material/DriveEta'
import SettingsIcon from '@mui/icons-material/Settings'
import carplay from './carplay.png'

function NavButton ({name}) {
    return(

        <BottomNavigationAction
            component={Link}
            to={name}
            icon={
                name === 'carplay' ?
                    <img src={carplay} width={25} height={25} /> :
                name === 'climate' ?
                    <AcUnitIcon /> :
                name === 'vehicle' ?
                    <DriveEtaIcon /> :
                name === 'settings' ?
                    <SettingsIcon /> :
                    <AcUnitIcon />
            }
        />
    )
}

export default NavButton;