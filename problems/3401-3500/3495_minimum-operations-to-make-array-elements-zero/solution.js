/**
 * @param {number[][]} queries
 * @return {number}
 */
var minOperations = function (queries) {
    // cost(x) = k for x in [4^(k-1), 4^k): one "/4" step per band. An
    // operation performs two steps, so a query with S total steps over
    // [l, r] needs ceil(S / 2) operations. Per-query S <= 1.5e10 and the
    // running total <= ~7.5e14 < 2^53, so JS numbers stay exact.
    function stepsUpTo(v) {
        let total = 0;
        let low = 1;
        let k = 1;
        while (low <= v) {
            const high = Math.min(v, low * 4 - 1);
            total += k * (high - low + 1);
            low *= 4;
            k += 1;
        }
        return total;
    }
    let ops = 0;
    for (const [l, r] of queries) {
        const s = stepsUpTo(r) - stepsUpTo(l - 1);
        ops += Math.floor((s + 1) / 2);
    }
    return ops;
};
