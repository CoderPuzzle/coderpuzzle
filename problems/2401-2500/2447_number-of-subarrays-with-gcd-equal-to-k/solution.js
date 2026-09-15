/**
 * @param {number[]} nums
 * @param {number[]} k
 * @return {number}
 */
var subarrayGCD = function (nums, k) {
    // Anchor the left endpoint and sweep right, carrying the running
    // gcd of nums[i..j]: it only ever shrinks (each new element can
    // lower it, never raise it). Once k stops dividing the carried
    // gcd, every later gcd divides it too, so k is unreachable —
    // break. Each j where the gcd equals k is one counted subarray.
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        let g = 0;
        for (let j = i; j < n; j++) {
            g = gcd(g, nums[j]);
            if (g % k !== 0) break;
            if (g === k) total++;
        }
    }
    return total;
};
