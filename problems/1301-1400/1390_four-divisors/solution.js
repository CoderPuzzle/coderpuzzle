/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function (nums) {
    // Divisors pair up around the square root, so one scan to isqrt(n)
    // sees them all: each hit contributes d and n/d (collapsed to one
    // when d*d == n). Track count and sum together and add the sum only
    // for numbers landing on exactly four divisors.
    let total = 0;
    for (const n of nums) {
        let count = 0;
        let divisorSum = 0;
        for (let d = 1; d * d <= n; ++d) {
            if (n % d === 0) {
                if (d * d === n) {
                    ++count;
                    divisorSum += d;
                } else {
                    count += 2;
                    divisorSum += d + n / d;
                }
            }
        }
        if (count === 4) {
            total += divisorSum;
        }
    }
    return total;
};
