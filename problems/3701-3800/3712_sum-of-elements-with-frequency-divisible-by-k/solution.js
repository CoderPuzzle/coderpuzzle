/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumDivisibleByK = function (nums, k) {
    // Qualification is decided per value: drop every element into the
    // bucket of its own value; values are bounded by 100, so the value
    // itself indexes a fixed array of counters.
    const counts = new Array(101).fill(0);
    for (const num of nums) {
        counts[num]++;
    }
    // A bucket qualifies when its count is a positive multiple of k; it
    // then contributes its value once per occurrence.
    let total = 0;
    for (let value = 1; value <= 100; value++) {
        if (counts[value] > 0 && counts[value] % k === 0) {
            total += value * counts[value];
        }
    }
    return total;
};
