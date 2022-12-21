class Id840 {
    constructor() {
        this.data = {
            diag: {
                alternatorCurrent: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        this.data.diag.alternatorCurrent = message.readUint8(3);
        return this.data;
    };
}

module.exports = Id840;