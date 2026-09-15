/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (m, n, k) {
    // The table is too big to build; its values are orderly enough to count.
    // Row i holds multiples i, 2i, ..., ni — min(floor(x / i), n) of them are <= x.
    const countAtMost = (x) => {
        let total = 0;
        for (let i = 1; i <= m; i++) {
            total += Math.min(Math.floor(x / i), n);
            // Early exit once the count already reaches k.
            if (total >= k) return true;
        }
        return total >= k;
    };
    // Smallest x whose count reaches k; it must be an actual table entry,
    // otherwise x - 1 would satisfy the predicate too.
    let lo = 1,
        hi = m * n;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countAtMost(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};
