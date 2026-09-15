/**
 * @param {number[]} nums
 * @return {number}
 */
var maxPairStrength = function (nums) {
    // Fewer than two million pairs at n <= 2000, so every distinct index
    // pair is tried directly: g = gcd(a, b), strength = a * b / g^2. The
    // division is exact because g divides both factors, and equal values
    // collapse to 1, which is why [3,3] scores 1. Products stay below
    // 1e10, inside the 2^53 exact-integer range of doubles, so the
    // division lands on the integer answer exactly.
    let best = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const g = gcd(nums[i], nums[j]);
            const s = (nums[i] * nums[j]) / (g * g);
            if (s > best) {
                best = s;
            }
        }
    }
    return best;
};

function gcd(a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}
