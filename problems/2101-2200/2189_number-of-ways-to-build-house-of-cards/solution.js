/**
 * @param {number} n
 * @return {number}
 */
var houseOfCards = function (n) {
    // Rows shrink going up; a row of k triangles costs 3k - 1 cards.
    // Memoized recursion over (cards left, largest row allowed above).
    const memo = Array.from({ length: n + 1 }, () => new Array(n + 2).fill(-1));
    const count = (remaining, allowed) => {
        if (memo[remaining][allowed] >= 0) {
            return memo[remaining][allowed];
        }
        let total = 0;
        for (let k = 1; k <= allowed && 3 * k - 1 <= remaining; ++k) {
            const used = 3 * k - 1;
            if (used === remaining) {
                total += 1;
            } else {
                total += count(remaining - used, k - 1);
            }
        }
        total %= 1000000007;
        memo[remaining][allowed] = total;
        return total;
    };
    return count(n, n);
};
