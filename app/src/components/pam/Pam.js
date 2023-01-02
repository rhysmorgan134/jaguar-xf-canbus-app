import React from "react";
import { useDispatch, useSelector} from "react-redux";
import './Pam.css'
import car from '../../images/car.png'


const Pam = () => {

    const pam = useSelector(state => state.pam.pam);



    return (
        <div style={{height: "300px", width: "250px"}}>
            <div id="pam">
                <div id="sensors">
                    <div id="mainPam">
                        <div id="disA4" className={pam.frontLeft > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA1" className={pam.frontLeft > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA2" className={pam.frontLeft > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA3" className={pam.frontLeft > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                    <div id="main2">
                        <div id="dis4" className={pam.frontLeftMiddle > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis1" className={pam.frontLeftMiddle > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis2" className={pam.frontLeftMiddle > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis3" className={pam.frontLeftMiddle > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                    <div id="main3">
                        <div id="dis4" className={pam.frontRightMiddle > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis1" className={pam.frontRightMiddle > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis2" className={pam.frontRightMiddle > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis3" className={pam.frontRightMiddle > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                    <div id="main4">
                        <div id="disA4" className={pam.frontRight > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA1" className={pam.frontRight > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA2" className={pam.frontRight > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA3" className={pam.frontRight > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                </div>
                <div id="pic">
                    <img src={car}/>
                </div>
                <div id="sensors2">
                    <div id="mainPam">
                        <div id="disA4" className={pam.rearRight > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA1" className={pam.rearRight > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA2" className={pam.rearRight > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA3" className={pam.rearRight > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                    <div id="main2">
                        <div id="dis4" className={pam.rearRightMiddle > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis1" className={pam.rearRightMiddle > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis2" className={pam.rearRightMiddle > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis3" className={pam.rearRightMiddle > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                    <div id="main3">
                        <div id="dis4" className={pam.rearLeftMiddle > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis1" className={pam.rearLeftMiddle > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis2" className={pam.rearLeftMiddle > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="dis3" className={pam.rearLeftMiddle > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                    <div id="main4">
                        <div id="disA4" className={pam.rearLeft > 5 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA1" className={pam.rearLeft > 13 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA2" className={pam.rearLeft > 22 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                        <div id="disA3" className={pam.rearLeft > 28 ? "sensorLine disClear" : "sensorLine"}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pam;