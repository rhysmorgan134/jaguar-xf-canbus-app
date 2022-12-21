import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import Paper from '@mui/material/Paper';
import { sendAction} from "../../actions";
import Grid from '@mui/material/Grid';
import Temperature from "./Temperature";
import CarOverview from "./CarOverview";
import checkPage from "../../utils";


function Climate() {
    const pageTitle = 'climate'
    const details = useSelector(state => state.climate);
    const driversTemp = details.driverTempText;
    const passengerTemp = details.passTempText;
    const defrost = details.defrost;
    const rearHeater = details.rearHeater;
    const interiorTemp = details.interiorTemp;
    const auto = details.auto;
    const frontHeater = details.frontHeater;
    const recirc = details.recirc;
    const exteriorTemp = details.exteriorTemp;

    const dispatch = useDispatch()


    useEffect(() => {
        checkPage(pageTitle)

        // if(pageTitle !== )

    }, [])

    const action = (actionDetails) => {
        dispatch(sendAction(actionDetails))
    }



    return (
            <Grid container justifyItems={'center'} alignItems={'center'} spacing={3} direction={'row'} sx={{height: '100%', maxHeight: '100%'}}>
                <Grid item xs={4}>
                    <Temperature value={driversTemp} action={action}  name={'driver'} />
                </Grid>
                <Grid item xs={4}>
                    <CarOverview
                        action={action}
                        rearHeater={rearHeater}
                        frontHeat={frontHeater}
                        auto={auto}
                        defrost={defrost}
                        interiorTemp={interiorTemp}
                        recirc={recirc}
                        exteriorTemp={exteriorTemp}
                        />
                </Grid>
                <Grid item xs={4} >
                    <Temperature value={passengerTemp} action={action} name={'pass'}/>
                </Grid>
            </Grid>
    );
}

export default Climate;