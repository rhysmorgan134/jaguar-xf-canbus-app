const EventEmitter = require('events')

class Utils extends EventEmitter {
    //constructor(brightnessValues, getValues, dayGpio, nightGpio, exec, win){ //, exec, win, test
    constructor(brightnessValues, getValues, exec, win){ //, exec, win, test
        super()
        this.brightnessValues = getValues;
        //this.dayGpio = dayGpio;
        //this.nightGpio = nightGpio;
        this.exec = exec;
        this.win = win;
        // this.dayGpio = dayGpio;
        // this.nightGpio = nightGpio;
        // this.exec = exec;
        this.isNight = true;

        setInterval(this.checkDayNight.bind(this), 100);
        setInterval(this.adjustAmbient.bind(this), 500);

    }

    checkDayNight() {
        if(this.brightnessValues.rawLightResistance > 0 && this.isNight === false) {
            console.log("Changed to night");
            this.isNight = true;
            this.emit("Dark")
        } else if (this.brightnessValues.rawLightResistance === 0 && this.isNight === true){
            this.emit("Light")
            console.log("Changed to day");
            this.isNight = false;
        }
    }

    adjustAmbient() {
        if(!(this.isNight)) {
            this.exec("sudo sh -c 'echo " + '"' + this.brightnessValues.adjustedAmbient + '"' + " > /sys/class/backlight/rpi_backlight/brightness'")
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
