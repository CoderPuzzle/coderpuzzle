/**
 * @param {number[][]} statements
 * @return {number}
 */
var maximumGood = function (statements) {
    const n = statements.length;
    let best = 0;
    // Enumerate every assignment: bit i set means person i is good. The
    // constraint is one-sided — good people must tell the truth, bad people
    // may say anything.
    for (let mask = 0; mask < 1 << n; mask++) {
        let valid = true;
        let count = 0;
        for (let i = 0; i < n && valid; i++) {
            if (!(mask & (1 << i))) {
                continue;
            }
            count++;
            for (let j = 0; j < n; j++) {
                // 2 = no statement; a "j is good" claim requires bit j set
                // and a "j is bad" claim requires it clear.
                if (statements[i][j] === 2) {
                    continue;
                }
                const isGood = (mask & (1 << j)) !== 0;
                if (isGood !== (statements[i][j] === 1)) {
                    valid = false;
                    break;
                }
            }
        }
        if (valid) {
            best = Math.max(best, count);
        }
    }
    return best;
};
