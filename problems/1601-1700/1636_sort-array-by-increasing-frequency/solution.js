/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
    // Count each value's frequency, then sort a copy by a composite key:
    // frequency ascending, value descending on ties.
    const freq = new Map();
    for (const value of nums) freq.set(value, (freq.get(value) || 0) + 1);

    return [...nums].sort((a, b) => {
        const diff = freq.get(a) - freq.get(b);
        if (diff !== 0) return diff;
        return b - a;
    });
};
