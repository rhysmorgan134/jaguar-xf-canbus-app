import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import checkPage from "../../utils";
import CarplayWindow from "./carplayWindow";
import Container from "@mui/material/Container"

function Carplay(props) {
    const pageTitle = 'carplay'

    const dispatch = useDispatch()


    const leave = () => {
        props.history.push('/climate')
    }

    useEffect(() => {
        checkPage(pageTitle)

        // if(pageTitle !== )

    }, [])

    return (
        <Container maxWidth={false} disableGutters sx={{height: '100%'}}>
            <CarplayWindow style={{height: '100%', flexGrow: 1}} leave={leave}/>
        </Container>
    );
}

export default Carplay;