/**
 * @param {number[]} banned
 * @param {number} n
 * @param {number} maxSum
 * @return {number}
 */
var maxCount = function (banned, n, maxSum) {
    // Greedy ascending: the cheapest remaining legal integer always leaves
    // at least as much slack as any alternative, so walking 1..n and
    // taking values while the running sum fits is optimal. Bans outside
    // [1, n] are ignored; the sum stays <= maxSum <= 10^9, exactly inside
    // Number-safe integer range.
    const isBanned = new Array(n + 1).fill(false);
    for (const x of banned) {
        if (x <= n) {
            isBanned[x] = true;
        }
    }
    let count = 0;
    let total = 0;
    for (let v = 1; v <= n; v++) {
        if (isBanned[v]) {
            continue;
        }
        if (total + v > maxSum) {
            break;
        }
        total += v;
        count++;
    }
    return count;
};
