import React, {useState, useEffect} from 'react';
import DataBox from "../common/DataBox";
import {Grid, Box} from "@mui/material";
import { useDispatch, useSelector} from "react-redux";


function VehicleInfo() {
    const diag = useSelector(state => state.engineDetails.diag);

    return (
        <Grid container justify={'center'} alignItems={'center'} alignContent={'center'} spacing={3}>
            <Grid item xs={6}>
                <DataBox value={diag.speed} title={'Speed'} units={'MPH'} min={0} max={140} limit={80}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={diag.revs} title={'Engine Speed'} units={'RPM'} min={0} max={5000} limit={800}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={diag.coolant} title={'Coolant Temp'} units={'°C'} min={0} max={120} limit={100}/>
            </Grid>
            <Grid item xs={6}>
                <DataBox value={0} title={'Oil Temp'} units={'°C'} min={'0'} max={120} limit={100}/>
            </Grid>
        </Grid>
    )
}

export default VehicleInfo
