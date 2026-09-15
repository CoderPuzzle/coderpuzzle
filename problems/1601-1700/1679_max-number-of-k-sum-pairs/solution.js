/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
    // An operation always consumes one x and one k - x, so the answer
    // depends only on how often each value occurs. For x below its
    // complement the pair count is capped by the scarcer side, giving
    // min(count(x), count(k - x)); when k is even, x = k / 2 is its own
    // complement and pairs with itself count(x) / 2 times. Comparing x
    // with k - x directly, never summing two values, keeps every
    // intermediate inside 32 bits.
    const count = new Map();
    for (const value of nums) {
        count.set(value, (count.get(value) ?? 0) + 1);
    }
    let ops = 0;
    for (const [x, c] of count) {
        const complement = k - x;
        if (x < complement) {
            ops += Math.min(c, count.get(complement) ?? 0);
        } else if (x === complement) {
            ops += Math.floor(c / 2);
        }
    }
    return ops;
};
