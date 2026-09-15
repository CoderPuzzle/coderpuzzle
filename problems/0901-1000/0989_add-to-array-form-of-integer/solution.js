/**
 * `num` can hold 10⁴ digits, far past any fixed-width integer, so the
 * addition runs schoolbook-style: right to left, one digit at a time, with
 * `k` itself seeding the running carry.
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
    let carry = k;
    const result = [];
    for (let i = num.length - 1; i >= 0; --i) {
        carry += num[i];
        result.push(carry % 10);
        carry = Math.floor(carry / 10);
    }
    // whatever of k outlives num keeps flowing out one digit at a time
    while (carry > 0) {
        result.push(carry % 10);
        carry = Math.floor(carry / 10);
    }
    // digits were emitted least-significant first
    result.reverse();
    return result;
};
