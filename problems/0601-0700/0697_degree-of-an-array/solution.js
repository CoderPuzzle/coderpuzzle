/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
    // The degree is a maximum frequency, and a window reaches it only by
    // holding every copy of some value at that frequency: drop one copy
    // and that value falls short. One pass records each value's count,
    // first index, and last index; the answer is then the tightest
    // first-to-last span among the values whose count equals the degree.
    const count = new Map();
    const first = new Map();
    const last = new Map();
    for (let index = 0; index < nums.length; ++index) {
        const value = nums[index];
        count.set(value, (count.get(value) ?? 0) + 1);
        if (!first.has(value)) {
            first.set(value, index);
        }
        last.set(value, index);
    }
    let degree = 0;
    for (const freq of count.values()) {
        degree = Math.max(degree, freq);
    }
    let best = nums.length;
    for (const [value, start] of first) {
        if (count.get(value) === degree) {
            const end = last.get(value);
            if (end !== undefined) {
                best = Math.min(best, end - start + 1);
            }
        }
    }
    return best;
};
