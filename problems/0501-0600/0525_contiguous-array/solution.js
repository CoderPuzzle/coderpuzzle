/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    // Treat 0 as -1 and 1 as +1 and carry the running balance: equal
    // counts cancel, so a repeated balance at i < j bounds an
    // equal-count subarray of length j - i. Keep only the FIRST index
    // of each balance (0 seeded at -1) so every repeat stretches its
    // window as far as possible.
    const first = new Map([[0, -1]]);
    let best = 0;
    let balance = 0;
    for (let index = 0; index < nums.length; ++index) {
        balance += nums[index] === 1 ? 1 : -1;
        const earlier = first.get(balance);
        if (earlier !== undefined) {
            best = Math.max(best, index - earlier);
        } else {
            first.set(balance, index);
        }
    }
    return best;
};
