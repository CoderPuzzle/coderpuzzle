// The `declare global` merge makes every Date carry nextDay() from this
// line on; the method body mirrors the JS bundle exactly: advancing the UTC
// day-of-month by one lets the engine normalize every rollover (month
// lengths, leap years, the year boundary), and because the parsed instant
// is UTC midnight the UTC accessors stay immune to the host's time zone.
// toISOString() renders that instant zero-padded as "YYYY-MM-DD...", so the
// first ten characters are the formatted next day.
declare global {
    interface Date {
        nextDay(): string;
    }
}

Date.prototype.nextDay = function (this: Date): string {
    this.setUTCDate(this.getUTCDate() + 1);
    return this.toISOString().slice(0, 10);
};

// The judged entry point: the typed wire hands the plain date string here,
// and the answer comes from the enhanced prototype above.
function nextDay(date: string): string {
    return new Date(date).nextDay();
}
