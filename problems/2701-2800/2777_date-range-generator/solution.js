// The whole range lives in UTC-millisecond arithmetic: Date.UTC builds each
// endpoint from its raw YYYY-MM-DD components (never the local-timezone
// parser), stepping adds whole-day multiples of 86400000, and the emitted
// strings are read back through the UTC getters — so the host's timezone
// and DST rules can never shift a yielded day.
function* dateRangeGenerator(start, end, step) {
    let current = Date.UTC(Number(start.slice(0, 4)), Number(start.slice(5, 7)) - 1, Number(start.slice(8, 10)));
    const endMs = Date.UTC(Number(end.slice(0, 4)), Number(end.slice(5, 7)) - 1, Number(end.slice(8, 10)));
    const stepMs = step * 86400000;
    while (current <= endMs) {
        const moment = new Date(current);
        yield String(moment.getUTCFullYear()).padStart(4, "0") +
            "-" +
            String(moment.getUTCMonth() + 1).padStart(2, "0") +
            "-" +
            String(moment.getUTCDate()).padStart(2, "0");
        current += stepMs;
    }
}

class Solution {
    run(genCase) {
        genCase.drive(dateRangeGenerator);
    }
}
