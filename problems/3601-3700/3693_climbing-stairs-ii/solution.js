/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function (n, costs) {
    // prev1/prev2/prev3 are the cheapest ways to stand on the three steps
    // below the current one. Step 0 is free; the steps below it do not
    // exist, so their infinite costs price step 1 out of long opening
    // jumps.
    let prev1 = 0,
        prev2 = Infinity,
        prev3 = Infinity;
    for (let j = 1; j <= n; j++) {
        const land = costs[j - 1];
        // The final hop covered d steps for some d in 1..3, paying the
        // landing fee plus the squared jump length. Totals stay near 10^9,
        // far under 2^53, so plain numbers are exact.
        const cur = Math.min(prev1 + land + 1, prev2 + land + 4, prev3 + land + 9);
        prev3 = prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
};
