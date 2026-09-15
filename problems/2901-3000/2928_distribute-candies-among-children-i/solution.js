/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
var distributeCandies = function (n, limit) {
    // Fix the first child's share, then the other two just need b + c
    // = rest with both halves capped: the valid b values form the
    // consecutive range [max(0, rest - limit), min(limit, rest)]. With
    // n <= 50 the count stays below C(52, 2) = 1326, far inside Number.
    let total = 0;
    const upper = Math.min(n, limit);
    for (let first = 0; first <= upper; first++) {
        const rest = n - first;
        const low = Math.max(0, rest - limit);
        const high = Math.min(limit, rest);
        if (high >= low) {
            total += high - low + 1;
        }
    }
    return total;
};
