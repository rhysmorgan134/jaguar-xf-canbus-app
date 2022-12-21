import React, {useState, useEffect} from 'react';
import DataBox from "../common/DataBox";
import {Grid, Box} from "@mui/material";
import { useDispatch, useSelector} from "react-redux";


function BatteryInfo() {
    const diag = useSelector(state => state.engineDetails.diag);
    return (
        <Grid container justify={'center'} alignItems={'center'} alignContent={'center'} spacing={3}>
            <Grid item xs={6}>
                <DataBox value={diag.batteryVoltage} title={'Battery Voltage'} units={'V'} min={0} max={6} limit={18.5}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={diag.alternatorCurrent} title={'Alternator Current'} units={'A'} min={0} max={200} limit={150}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={diag.chargingCurrent} title={'Charging Current'} units={'A'} min={0} max={30} limit={15}/>
            </Grid>
            {/*<Grid item xs={6}>*/}
            {/*    <DataBox value={details.oil} title={'Oil Temp'} units={'°C'} min={'0'} max={120} limit={100}/>*/}
            {/*</Grid>*/}
        </Grid>
    )
}

export default BatteryInfo
