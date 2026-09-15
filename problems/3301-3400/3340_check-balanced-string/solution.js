/**
 * @param {string} num
 * @return {boolean}
 */
var isBalanced = function (num) {
    // Only the two digit totals matter, and one pass can carry both at
    // once: add every digit sitting at an even index and subtract every
    // digit at an odd index. The even- and odd-index sums are equal
    // exactly when the signed total ends back at zero, so no second
    // pass or pair of accumulators is needed.
    let balance = 0;
    for (let i = 0; i < num.length; i++) {
        balance += i % 2 === 0 ? +num[i] : -num[i];
    }
    return balance === 0;
};
