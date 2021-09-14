const EventEmitter = require('events')

class Utils extends EventEmitter {
    constructor(brightnessValues, getValues, exec, win){ //, exec, win, test
        super()
        this.brightnessValues = getValues;
        // this.dayGpio = dayGpio;
        // this.nightGpio = nightGpio;
        this.exec = exec;
        this.win = win;
        // this.dayGpio = dayGpio;
        // this.nightGpio = nightGpio;
        // this.exec = exec;
        this.isNight = false;

        setInterval(this.checkDayNight.bind(this), 100);
        setInterval(this.adjustAmbient.bind(this), 500);
        setInterval(() => {
            let dashMode = true;
            if(dashMode !== this.isNight) {
                if(this.isNight) {
                    //this.dash.mode('Dark')
                    this.emit("Dark")
                } else {
                    //this.dash.mode('Light')
                    this.emit("Light")
                }
            }
            }, 1000)

    }

    checkDayNight() {
        // if(this.brightnessValues.rawLightResistance > 0 && this.isNight === false) {
        //     this.dash.mode('Dark')
        //     console.log("Changed to night");
        //     this.isNight = true;
        //     this.emit("Dark")
        // } else if (this.brightnessValues.rawLightResistance === 0 && this.isNight === true){
        //     this.dash.mode('Light')
        //     this.emit("Light")
        //     console.log("Changed to day");
        //     this.isNight = false;
        // }
    }

    adjustAmbient() {
        if(!(this.isNight)) {
            //console.log("setting brightness: ", this.brightnessValues.adjustedAmbient)
            this.exec("xrandr --output DP-1 --brightness " + this.brightnessValues.adjustedAmbient )
        }
    }

    get night() {
        return this.isNight;
    }

    get resBrightness() {
        return this.brightnessValues.adjustedLight;
    }

}

module.exports = Utils;
