/**
 * @param {number[]} nums
 * @return {number}
 */
var gcdSum = function (nums) {
    // prefixGcd[i] is gcd(nums[i], running max so far). Once built, the
    // sorted list is paired smallest-with-largest, and each pair's gcd is
    // summed — a two-pointer walk from both ends. Each gcd is at most 1e9
    // and there are at most 5e4 pairs, so the sum stays below 2^53 and the
    // plain-number arithmetic lands exactly.
    const prefixGcd = [];
    let running = 0;
    for (const value of nums) {
        running = value > running ? value : running;
        prefixGcd.push(gcd(value, running));
    }
    prefixGcd.sort((a, b) => a - b);
    let lo = 0;
    let hi = prefixGcd.length - 1;
    let total = 0;
    while (lo < hi) {
        total += gcd(prefixGcd[lo], prefixGcd[hi]);
        lo++;
        hi--;
    }
    return total;
};

function gcd(a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}
