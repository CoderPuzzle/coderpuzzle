/**
 * @param {number} n
 * @param {number[]} quantities
 * @return {number}
 */
var minimizedMaximum = function (n, quantities) {
    // A store holds one product type only, so a type with q items needs
    // ceil(q/x) stores.
    const storesNeeded = (x) => {
        let total = 0;
        for (const q of quantities) {
            total += Math.ceil(q / x);
        }
        return total;
    };

    // Feasibility is monotone in the cap x, so binary-search the smallest
    // feasible one. hi = max(quantities) is always feasible (one store can
    // take an entire product type).
    let lo = 1;
    let hi = Math.max(...quantities);
    // Invariant: lo possibly too small, hi known feasible; the sum check
    // uses <= n since leftover stores may receive nothing.
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (storesNeeded(mid) <= n) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
