/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var permute = function (n, k) {
    // Counts only ever face comparison against k (<= 1e15), so the
    // factorials may saturate at a cap above 1e15: a saturated count still
    // reads as "more permutations than k needs". Every value here stays
    // below 2^53 — k <= 1e15, the cap is 2e15, and any product that would
    // exceed it rounds to a float still far above the cap — so JS numbers
    // remain exact wherever the value is used.
    const cap = 2e15;
    const half = Math.floor((n + 1) / 2);
    const fact = new Array(half + 1).fill(1);
    for (let i = 2; i <= half; ++i) {
        fact[i] = Math.min(fact[i - 1] * i, cap);
    }
    const result = [];
    // One flag per value: the greedy consumes each of 1..n at most once.
    const used = new Array(n + 1).fill(false);
    let oddsLeft = Math.floor((n + 1) / 2);
    let evensLeft = Math.floor(n / 2);
    let lastParity = -1;
    for (let position = 0; position < n; ++position) {
        // Ascending candidates: skip past the ones whose completion count
        // is too small to still hold k, reducing k by their size.
        let placed = false;
        for (let value = 1; value <= n; ++value) {
            if (used[value] || value % 2 === lastParity) continue;
            const odd = oddsLeft - (value % 2);
            const even = evensLeft - (1 - (value % 2));
            // Once this value lands, the remaining parity pattern is
            // forced: the slots alternate starting with the opposite
            // parity, so the count is odd! * even! exactly when the
            // leftover values fit that pattern, and 0 otherwise.
            const rest = n - result.length - 1;
            const oddSlots = Math.floor((rest + 1 - (value % 2)) / 2);
            let ways = 0;
            if (oddSlots === odd && rest - oddSlots === even) {
                ways = Math.min(fact[odd] * fact[even], cap);
            }
            if (ways >= k) {
                used[value] = true;
                result.push(value);
                if (value % 2) {
                    --oddsLeft;
                } else {
                    --evensLeft;
                }
                lastParity = value % 2;
                placed = true;
                break;
            }
            k -= ways;
        }
        if (!placed) {
            // Fewer than k alternating permutations exist.
            return [];
        }
    }
    return result;
};
