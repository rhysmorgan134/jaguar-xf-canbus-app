class Id472 {
    constructor() {
        this.data = {
            diag: {
                speed: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        let speed = message.readUIntBE(1, 2)
        this.data.diag.speed = ((speed * 0.65) / 100).toFixed(1);
        return this.data;
    };
}

module.exports = Id472;