/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    // Candidate value -> position, so the ways can be reported in the
    // order the backtracking search would meet them.
    const position = new Map();
    candidates.forEach((value, index) => position.set(value, index));
    // table[amount] holds every way of reaching that amount with the
    // candidates processed so far. Owing nothing has exactly one way --
    // the empty one -- which seeds the sweep.
    const table = Array.from({ length: target + 1 }, () => []);
    table[0].push([]);
    for (const value of candidates) {
        for (let amount = value; amount <= target; amount++) {
            // Extend every way that is exactly `value` short. A way may
            // already contain this candidate: that is the unlimited
            // reuse, falling out of ascending amounts within one pass.
            for (const way of table[amount - value]) {
                table[amount].push(way.concat(value));
            }
        }
    }
    const ways = table[target];
    // Candidate-outer passes pin each way to one order (its values grouped
    // by candidate position), but the table fills in amount order, so a
    // final lexicographic sort by position restores the discovery order.
    ways.sort((a, b) => {
        const shared = Math.min(a.length, b.length);
        for (let i = 0; i < shared; i++) {
            const pa = position.get(a[i]);
            const pb = position.get(b[i]);
            if (pa !== pb) return pa - pb;
        }
        return a.length - b.length;
    });
    return ways;
};
