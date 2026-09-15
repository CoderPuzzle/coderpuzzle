/**
 * @param {string} s
 * @return {number}
 */
var longestRepeatingSubstring = function (s) {
    const n = s.length;

    // Exact check: every length-`length` window goes into a set, so a hit
    // means two identical substrings (overlaps allowed) — no hashing caveats.
    const hasRepeat = (length) => {
        if (length === 0) {
            return true;
        }
        const seen = new Set();
        for (let i = 0; i + length <= n; i++) {
            const piece = s.substring(i, i + length);
            if (seen.has(piece)) {
                return true;
            }
            seen.add(piece);
        }
        return false;
    };

    // Monotone feasibility: a repeat of length L implies repeats of every
    // shorter length, so binary search the largest feasible length. The
    // upper-mid convention keeps the loop terminating; hi starts at n-1
    // because the whole string cannot repeat within itself.
    let lo = 0;
    let hi = n - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (hasRepeat(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
