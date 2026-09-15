/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    // Every Fibonacci number is the sum of the two before it, so one walk
    // up from the seeds F(0) = 0 and F(1) = 1 reaches F(n): roll the pair
    // forward and the second variable ends on the answer. Only the last two
    // values ever matter, so nothing is tabulated. Every value stays small —
    // F(30) = 832040 — so these doubles hold each sum exactly.
    if (n < 2) {
        return n;
    }
    let previous = 0;
    let current = 1;
    for (let i = 1; i < n; i++) {
        const next = previous + current;
        previous = current;
        current = next;
    }
    return current;
};
