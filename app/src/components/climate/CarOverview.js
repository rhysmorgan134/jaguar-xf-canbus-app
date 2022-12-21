import React from 'react';
import car from '../../images/car.png'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import {SvgIcon, Typography} from "@mui/material";
import {ReactComponent as Rear} from '../../images/SVG/rearWindow.svg'
import {ReactComponent as Front} from '../../images/SVG/frontDefrost.svg'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {Autorenew, PowerSettingsNew} from "@mui/icons-material";
import Button from "@mui/material/Button";




function CarOverview ({rearHeater,frontHeater,auto,defrost,interiorTemp,recirc, action, exteriorTemp}) {

    const handleClick = (type) => {

    }

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} spacing={3} direction={'column'} sx={{height: '100%', maxHeight: '100%'}}>
            <Grid item grow={1} xs={12} sx={{height: '100%', maxHeight: '100%'}} >
                <Grid container justify={'center'} direction={'row'} spacing={1}>
                    <Grid
                        item
                        xs={4}
                        direction={'row'}
                        onTouchStart={() => action({actionName: 'defrost', actionFunction: 'pressed'})}
                        onTouchEnd={() => action({actionName: 'defrost', actionFunction: 'rel'})}
                    >
                        <Button size={'large'}  fullWidth={true}>
                            <SvgIcon fontSize={'large'}>
                                <Front/>
                            </SvgIcon>
                        </Button>
                        <div style={defrost > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        direction={'row'}
                        onTouchStart={() => action({actionName: 'frontHeater', actionFunction: 'pressed'})}
                        onTouchEnd={() => action({actionName: 'frontHeater', actionFunction: 'rel'})}
                    >
                        <Button size={'large'}  fullWidth={true} >
                            <SvgIcon  fontSize={'large'}>
                                <Front/>
                            </SvgIcon>
                        </Button>
                        <div style={frontHeater > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                    </Grid>
                </Grid>

                <Grid container display={'flex'} direction={'row'} >
                    <Grid item xs={3}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box
                                onTouchStart={() => action({actionName: 'auto', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'auto', actionFunction: 'rel'})}
                            >
                                <Button size={'large'}  fullWidth={true}>
                                    AUTO
                                </Button>
                                <div style={auto > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                            <Box
                                onTouchStart={() => action({actionName: 'rearHeater', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'rearHeater', actionFunction: 'rel'})}
                            >
                                <Button size={'large'}  fullWidth={true}>
                                    <SvgIcon fontSize={'large'}>
                                        <Rear/>
                                    </SvgIcon>
                                </Button>
                                <div style={rearHeater > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Card elevation={0}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={car}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box
                                onTouchStart={() => action({actionName: 'recirc', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'recirc', actionFunction: 'rel'})}>
                                <Button size={'large'}  fullWidth={true}>
                                    <Autorenew fontSize={'large'}>
                                        <Rear />
                                    </Autorenew>
                                </Button>
                                <div style={recirc > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                            <Box
                                onTouchStart={() => action({actionName: 'fanOn', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'fanOn', actionFunction: 'rel'})}
                            >
                                <Button size={'large'}  fullWidth={true}>
                                    <PowerSettingsNew fontSize={'large'}>
                                        <Rear />
                                    </PowerSettingsNew>
                                </Button>
                                <div style={auto > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Typography align={'center'} variant="caption" component="p" gutterBottom>Interior Temp<br />{interiorTemp}°C</Typography>
                <Typography align={'center'} variant="caption" component="p" gutterBottom>Exterior Temp<br />{exteriorTemp}°C</Typography>
            </Grid>
        </Grid>
    )
}

export default CarOverview;