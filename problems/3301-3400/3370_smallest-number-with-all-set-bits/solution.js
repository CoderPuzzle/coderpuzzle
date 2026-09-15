/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function (n) {
    // Every number whose bits are all set has the form 2^t - 1. The
    // smallest such value that is >= n uses exactly as many bits as n has:
    // 32 - clz32(n) is n's bit length, so the answer is the strictly
    // greater power of two minus one (hint 1). With n <= 1000 the shift
    // stays far inside Number's exact integer window (result <= 1023).
    return (1 << (32 - Math.clz32(n))) - 1;
};
