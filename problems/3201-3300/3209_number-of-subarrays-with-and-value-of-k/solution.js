/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
    // Suffix ANDs ending at one index take at most ~30 distinct values:
    // walking the left end rightward can only clear bits, so every value
    // change drops at least one bit. (value, count) buckets make the
    // scan O(n * 30) instead of enumerating all subarrays.
    let total = 0;
    let values = [];
    let counts = [];
    for (const value of nums) {
        const nextValues = [value];
        const nextCounts = [1];
        for (let i = 0; i < values.length; i++) {
            const merged = values[i] & value;
            if (nextValues[nextValues.length - 1] === merged) {
                nextCounts[nextCounts.length - 1] += counts[i];
            } else {
                nextValues.push(merged);
                nextCounts.push(counts[i]);
            }
        }
        values = nextValues;
        counts = nextCounts;
        for (let i = 0; i < values.length; i++) {
            if (values[i] === k) total += counts[i];
        }
    }
    return total;
};
