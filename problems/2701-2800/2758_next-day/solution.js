// The enhancement itself: one step of engine-owned date arithmetic.
// Advancing the UTC day-of-month with setUTCDate(getUTCDate() + 1) lets the
// engine normalize every rollover — month lengths, leap years, the year
// boundary — and the parsed instant is UTC midnight, so the UTC setters
// cannot be dragged off by the host's time zone. toISOString() renders that
// instant zero-padded as "YYYY-MM-DD...", so slicing off the first ten
// characters is the formatted next day.
Object.defineProperty(Date.prototype, "nextDay", {
    value: function () {
        this.setUTCDate(this.getUTCDate() + 1);
        return this.toISOString().slice(0, 10);
    },
});

// The judged entry point: the typed wire hands the plain date string here,
// and the answer comes from the enhanced prototype above.
var nextDay = function (date) {
    return new Date(date).nextDay();
};
