// One map entry per message: the next timestamp it may print at.
class Logger {
    constructor() {
        this.nextAllowed = new Map();
    }

    shouldPrintMessage(timestamp, message) {
        const allowed = this.nextAllowed.get(message);
        if (allowed !== undefined && timestamp < allowed) {
            return false;
        }
        this.nextAllowed.set(message, timestamp + 10);
        return true;
    }
}
