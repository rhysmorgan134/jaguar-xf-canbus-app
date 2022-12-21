class Id424 {
    constructor() {
        this.data = {
            diag: {
                batteryVoltage:0.0,
                chargingCurrent: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        let value = message.readUint8(3)
        this.data.diag.batteryVoltage = ((value *  0.050000000745) + 6).toFixed(2)
        this.data.diag.chargingCurrent = (message.readUint8(5)) - 127
        return this.data
    };
}

module.exports = Id424;



