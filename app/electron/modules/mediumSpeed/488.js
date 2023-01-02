class Id488 {
    constructor() {
        this.data = {
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
            },
            mode: {
                sensors: false
            }
        }
    }

    parseMessage = (message, Id) => {
        this.data.pam.active = message.readUint8(1) & 128
        if(this.data.pam.active > 0) {
            this.data.mode.sensors = true;
        } else {
            this.data.mode.sensors = false;
        }
        if(this.data.pam.active) {
            let tempData = message.readUint32BE(1)
            tempData = ((tempData << 12) >>> 12)
            let mask = 31
            this.data.pam.frontLeft = tempData & mask
            this.data.pam.frontRight = (tempData >>> 15) & mask
            this.data.pam.frontLeftMiddle = (tempData >>> 5) & mask
            this.data.pam.frontRightMiddle = (tempData >>> 10) & mask
            tempData = message.readUint32BE(4)
            tempData = ((tempData << 12) >>> 12)
            console.log("rears", tempData)
            this.data.pam.rearLeft = tempData & mask
            this.data.pam.rearRight = (tempData >>> 10) & mask
            this.data.pam.rearLeftMiddle = (tempData >>> 5) & mask
            this.data.pam.rearRightMiddle = (tempData >>> 15) & mask
            console.log(this.data.pam)
        }

        return this.data;
    };
}

module.exports = Id488;



