/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPrimeFrequency = function (nums) {
    // One pass counts each distinct value's frequency in a hash map, then
    // every frequency is tested for primality by trial division: a factor
    // with divisor * divisor <= frequency refutes it, 0 and 1 fail
    // outright, and any frequency surviving the scan is prime.
    // Frequencies never exceed nums.length <= 100, so the checks are a
    // handful of divisions each.
    const counts = new Map();
    for (const value of nums) counts.set(value, (counts.get(value) || 0) + 1);
    for (const frequency of counts.values()) {
        if (frequency < 2) continue;
        let isPrime = true;
        for (let divisor = 2; divisor * divisor <= frequency; divisor++) {
            if (frequency % divisor === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) return true;
    }
    return false;
};
