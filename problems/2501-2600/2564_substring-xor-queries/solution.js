/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[][]}
 */
var substringXorQueries = function (s, queries) {
    // first ^ second <= 2^30 - 1 (both fit under 10^9), so only substrings
    // of at most 30 characters can ever match a query. Sweeping lengths
    // ascending records each decoded value the first time it is seen,
    // which is exactly the statement's pick: shortest length, ties broken
    // by the leftmost start.
    const best = new Map();
    const n = s.length;
    for (let length = 1; length <= Math.min(30, n); length++) {
        for (let left = 0; left + length <= n; left++) {
            if (s[left] === "0" && length > 1) {
                // "0xxx" decodes to xxx's value, which the previous,
                // shorter pass already handled.
                continue;
            }
            let val = 0;
            for (let k = left; k < left + length; k++) {
                val = val * 2 + (s.charCodeAt(k) - 48);
            }
            if (!best.has(val)) best.set(val, [left, left + length - 1]);
        }
    }
    return queries.map(([first, second]) => best.get(first ^ second) ?? [-1, -1]);
};
