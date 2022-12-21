class Id264 {
    constructor() {
        this.data = {
            diag: {
                revs: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        let revs = message.readUIntBE(2, 2);
        this.data.diag.revs = revs &~ 57344;
        return this.data;
    };
}

module.exports = Id264;