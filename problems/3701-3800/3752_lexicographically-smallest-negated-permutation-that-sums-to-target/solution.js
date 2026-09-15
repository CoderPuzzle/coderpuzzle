/**
 * @param {number} n
 * @param {number} target
 * @return {number[]}
 */
var lexSmallestNegatedPerm = function (n, target) {
    // The all-positive baseline [1, 2, ..., n] sums to S. Negating x
    // lowers the sum by 2 * x, so target is reachable exactly when it
    // lies in [-S, S] with the same parity as S. S stays under 2^53 for
    // every n in range, so plain numbers accumulate exactly.
    const total = (n * (n + 1)) / 2;
    if (target < -total || target > total || (total - target) % 2 !== 0) {
        return [];
    }
    let deficit = (total - target) / 2;
    const negated = new Array(n + 1).fill(false);
    // Greedily negate the largest values first; this is what puts the
    // most negative element at the front of the answer.
    for (let value = n; value >= 1; value--) {
        if (value <= deficit) {
            negated[value] = true;
            deficit -= value;
        }
    }
    const result = [];
    for (let value = n; value >= 1; value--) {
        if (negated[value]) {
            result.push(-value);
        }
    }
    for (let value = 1; value <= n; value++) {
        if (!negated[value]) {
            result.push(value);
        }
    }
    return result;
};
