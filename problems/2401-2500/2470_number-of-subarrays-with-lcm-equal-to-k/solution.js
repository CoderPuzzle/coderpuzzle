/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarrayLCM = function (nums, k) {
    // Anchor the left endpoint and sweep right, carrying the running
    // lcm of nums[i..j]: it only ever grows (each new element can
    // raise it, never lower it). Once it exceeds k, every later lcm
    // in this sweep is larger still, so k is unreachable — break.
    // Each j where the lcm equals k is one counted subarray.
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        let l = 1;
        for (let j = i; j < n; j++) {
            l = (l / gcd(l, nums[j])) * nums[j];
            if (l > k) break;
            if (l === k) total++;
        }
    }
    return total;
};
