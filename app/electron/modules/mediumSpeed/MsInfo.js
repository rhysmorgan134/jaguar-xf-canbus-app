const Id968 = require('./968');
const Id904 = require('./904');
const Id680 = require('./680');
const Id40 = require('./40');
const Id72 = require('./72');
const Id360 = require('./360');
const Id840 = require('./840');
const Id424 = require('./424')
const Id472 = require('./472')
const Id264 = require('./264')
const Id392 = require('./392')
const Id488 = require('./488')

const Utils = require('./Utils');
const EventEmitter = require('events')

class MsInfo extends EventEmitter{
    // constructor(canIds, outIds, dayGpio, nightGpio, exec, win) {
    constructor(canIds, outIds, exec, win) {
        super()
        this.bus = 'ms';
        this.canIds = canIds;
        this.outIds = outIds;
        this.IDs = [968, 904, 680, 40, 360, 72, 840, 424, 472, 264, 392, 488];
        this.data = {
            tripInfo: {
                tripDistance: {
                    pre: 'Distance',
                    suf: 'Miles',
                    val: 0
                },
                tripAvg: {
                    pre: 'AVG Speed',
                    suf: 'MPH',
                    val: 0
                },
                tripMpg: {
                    pre: 'Fuel',
                    suf: 'MPG',
                    val: 0
                },
                tripRange: {
                    pre: 'Range',
                    suf: 'Miles',
                    val: 0
                }
            },
            settings: {

            },
            mode: {
                dark: true,
                ger: 'park',
                sensors: false

            },
            brightness: {
                rawLightResistence: 0,
                adjustedLight: 255,
                ambientRaw: 0,
                adjustedAmbient: 255,

            },
            climate: {
                interiorTemp: 0,
                exteriorTemp: 0
            },
            diag: {
                alternatorCurrent: 0,
                batteryVoltage: 0.0,
                chargingCurrent: 0,
                speed: 0,
                coolant: 0,
                revs: 0
            },
            pam: {
                frontLeft: 0,
                frontLeftMiddle: 0,
                frontRightMiddle: 0,
                frontRight: 0,
                rearLeft: 0,
                rearLeftMiddle: 0,
                rearRightMiddle: 0,
                rearRight: 0,
                active: false

            }
        };
        //this.utils = new Utils(this.data.brightness, this.brightnessValues, dayGpio, nightGpio, exec, win);
        this.utils = new Utils(this.data.brightness, this.brightnessValues, exec, win);
        this.utils.on("Light", () => {
            console.log("changed to light")
            this.data.mode.dark = false
        });
        this.utils.on("Dark", () => {
            console.log("changed to dark")
            this.data.mode.dark = true
        })
        this.IdModules = {
            Id968: new Id968(),
            Id904: new Id904(),
            Id680: new Id680(this.canIds, this.outIds),
            Id40: new Id40(this.utils.brightnessValues, exec),
            Id360: new Id360(),
            Id72: new Id72(),
            Id840: new Id840(),
            Id424: new Id424(),
            Id472: new Id472(),
            Id264: new Id264(),
            Id392: new Id392(),
            Id488: new Id488()
        }

    }

    runAction(id, type, value) {
        console.log("running action for msbus: ", id, type, value)
    }

    get dataObj() {
        return this.data;
    };

    get brightnessValues() {
        return this.data.brightness;
    }

    parseMessage(message) {
        if(this.IDs.includes(message.id)) {
            let newData = this.IdModules['Id' + message.id].parseMessage(message.data, message.id);
            for (const [key, value] of Object.entries(newData)) {
                if(typeof value === "object") {
                    for(const [key2, value2] of Object.entries(value)) {
                        this.data[key][key2] = value2
                    }
                } else {
                    this.data[key] = value;
                }
            }
        }
    }
}

module.exports = MsInfo;
