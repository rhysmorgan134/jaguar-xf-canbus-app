import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Grid, Box} from "@mui/material";
import checkPage from "../../utils";
import DataBox from "../common/DataBox";
import DataBoxSingleLine from "../common/DataBoxSingleLine";
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import EngineInfo from "./EngineInfo";
import BatteryInfo from "./BatteryInfo";

function VehicleInfo() {

    const pageTitle = 'vehicleInfo';
    const details = useSelector(state => state.engineDetails.trip);



    useEffect(() => {
        checkPage(pageTitle)
        // if(pageTitle !== )
    }, [])

        return (
            <Box display={'flex'} size={100} justifyContent={'space-between'} flexDirection={'column'} flexGrow={1}>
                <SwipeableViews>
                    <EngineInfo details={details}/>
                    <BatteryInfo/>
                </SwipeableViews>
                <Grid container justifyContent={'space-around'}>
                    <DataBoxSingleLine data={details.tripMpg} />
                    <DataBoxSingleLine data={details.tripAvg} />
                    <DataBoxSingleLine data={details.tripDistance}/>
                    <DataBoxSingleLine data={details.tripRange}/>
                </Grid>
            </Box>

        );
}

export default VehicleInfo;