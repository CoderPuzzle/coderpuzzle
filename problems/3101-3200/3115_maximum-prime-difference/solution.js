/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumPrimeDifference = function (nums) {
    // One pass keeping the first and the last prime-bearing index; the
    // answer is their distance. Primality by trial division is cheap because
    // values never exceed 100 (at most 9 divisor probes).
    const isPrime = (v) => {
        if (v < 2) return false;
        for (let d = 2; d * d <= v; ++d) {
            if (v % d === 0) return false;
        }
        return true;
    };
    let first = -1;
    let last = -1;
    for (let i = 0; i < nums.length; ++i) {
        if (!isPrime(nums[i])) continue;
        if (first === -1) first = i;
        last = i;
    }
    return last - first;
};
