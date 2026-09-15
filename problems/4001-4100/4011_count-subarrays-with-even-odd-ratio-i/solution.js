/**
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var countRatioSubarrays = function (nums, a, b) {
    // Only element parity matters. Fix the left endpoint and extend the
    // right endpoint, carrying running even/odd counts so every subarray
    // is tested exactly once with its exact counts.
    const n = nums.length;
    let total = 0;
    for (let left = 0; left < n; left++) {
        let even = 0;
        let odd = 0;
        for (let right = left; right < n; right++) {
            if (nums[right] % 2 === 0) even++;
            else odd++;
            // Valid iff y > 0 and x/y <= a/b; with positive denominators
            // that is exactly b*even <= a*odd.
            if (odd > 0 && b * even <= a * odd) total++;
        }
    }
    return total;
};
