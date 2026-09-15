/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    // ways(i) obeys the Fibonacci recurrence: the last move onto step i
    // is a 1-step from i-1 or a 2-step from i-2, and the two groups are
    // disjoint and exhaustive, so ways(i) = ways(i-1) + ways(i-2).
    let prev = 1;
    let curr = 1;
    for (let i = 1; i < n; ++i) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
};
