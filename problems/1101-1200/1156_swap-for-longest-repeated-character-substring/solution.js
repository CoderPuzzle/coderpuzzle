/**
 * @param {string} text
 * @return {number}
 */
var maxRepOpt1 = function (text) {
    const counts = new Map();
    for (const ch of text) {
        counts.set(ch, (counts.get(ch) || 0) + 1);
    }
    // run-length encode
    const runs = [];
    for (const ch of text) {
        if (runs.length > 0 && runs[runs.length - 1][0] === ch) {
            runs[runs.length - 1][1] += 1;
        } else {
            runs.push([ch, 1]);
        }
    }
    let best = 0;
    for (const [ch, length] of runs) {
        best = Math.max(best, Math.min(length + 1, counts.get(ch)));
    }
    for (let i = 1; i < runs.length - 1; i++) {
        if (runs[i][1] === 1 && runs[i - 1][0] === runs[i + 1][0]) {
            const ch = runs[i - 1][0];
            const combined = runs[i - 1][1] + runs[i + 1][1];
            const extra = counts.get(ch) > combined ? 1 : 0;
            best = Math.max(best, combined + extra);
        }
    }
    return best;
};
