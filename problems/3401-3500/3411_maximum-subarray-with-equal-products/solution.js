/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function (nums) {
    // Elements are at most 10, so any lcm divides 2520 and any gcd is
    // at most 10: once the running product passes 25200 it can never
    // equal lcm * gcd again, so the inner walk can stop early.
    const n = nums.length;
    let ans = 0;
    for (let left = 0; left < n; left++) {
        let prod = 1,
            g = 0,
            m = 1;
        for (let right = left; right < n; right++) {
            const x = nums[right];
            prod *= x;
            g = gcd(g, x);
            m = (m * x) / gcd(m, x);
            if (prod === m * g) {
                ans = Math.max(ans, right - left + 1);
            } else if (prod > 25200) {
                break;
            }
        }
    }
    return ans;
};

var gcd = function (a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
};
