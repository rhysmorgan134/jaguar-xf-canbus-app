class Id392 {
    constructor() {
        this.data = {
            climate: {
                exteriorTemp: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        this.data.climate.interiorTemp = message.readUint8(0) - 40;
        return this.data;
    };
}

module.exports = Id392;



