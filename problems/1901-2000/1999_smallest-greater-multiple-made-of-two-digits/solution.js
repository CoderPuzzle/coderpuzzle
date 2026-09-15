/**
 * @param {number} k
 * @param {number} digit1
 * @param {number} digit2
 * @return {number}
 */
var findInteger = function (k, digit1, digit2) {
    // The only numbers that can qualify are those whose decimal
    // representation uses just {digit1, digit2}; there are at most
    // 2 + 4 + ... + 2^10 = 2046 of them up to 10 digits (11-digit
    // values already exceed 2^31 - 1). Generate every one, sort the
    // list, and scan for the first value that is > k and divisible
    // by k. All values stay below 10^10, inside Number's exact
    // integer range. A number never starts with 0, so seed the
    // generation with the nonzero digits only.
    const digits = [...new Set([digit1, digit2])].sort((a, b) => a - b);
    let cur = digits.filter((d) => d !== 0);
    const cands = [];
    for (let len = 0; len < 10; ++len) {
        cands.push(...cur);
        const nxt = [];
        for (const v of cur) {
            for (const d of digits) {
                nxt.push(v * 10 + d);
            }
        }
        cur = nxt;
    }
    cands.sort((a, b) => a - b);
    for (const v of cands) {
        if (v > 2147483647) break;
        if (v > k && v % k === 0) return v;
    }
    return -1;
};
