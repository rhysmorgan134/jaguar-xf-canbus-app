import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {IconButton} from "@mui/material";



const Temperature = ({value, action, name}) =>{

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent:'center', alignItems: 'center', verticalAlign: 'middle'}}>
            <IconButton ><KeyboardArrowUpIcon fontSize={'large'} onTouchStart={() => action({actionName: name + 'Up', actionFunction: 'pressed'})} onTouchEnd={() => action({actionName: name + 'Up', actionFunction: 'rel'})} style={{color: 'red'}}/></IconButton>
            <Typography align={'center'} variant="h1" component="h2" gutterBottom>{value}°C</Typography>
            <IconButton ><KeyboardArrowDownIcon  onTouchStart={() => action({actionName: name + 'Down', actionFunction: 'pressed'})} onTouchEnd={() => action({actionName: name + 'Down', actionFunction: 'rel'})} style={{color: 'blue'}} /></IconButton>
        </div>

    )

}

export default Temperature;