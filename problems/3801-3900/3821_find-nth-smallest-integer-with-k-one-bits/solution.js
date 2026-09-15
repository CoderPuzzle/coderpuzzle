/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var nthSmallest = function (n, k) {
    // Numbers with exactly k one bits and bit length exactly L are
    // C(L-1, k-1): a leading 1 plus k-1 ones among L-1 free slots, so
    // hockey-sticking over shorter lengths, C(L, k) candidates have
    // length <= L. Grow L until rank n fits, then unrank the rest
    // MSB -> LSB: placing 0 at position p leaves C(p, need) smaller
    // completions, so set the bit whenever the leftover rank exceeds
    // that block. Every binomial tops out at C(50, 25) ~ 1.26e14 and
    // the answer below 2^50, both inside Number's exact 2^53 range --
    // but JS bitwise operators coerce to 32 bits and would corrupt any
    // value past 2^31, so bits are set by adding exact powers of two.
    const C = Array.from({ length: 51 }, () => new Array(51).fill(0));
    for (let i = 0; i <= 50; i++) {
        C[i][0] = 1;
        for (let j = 1; j <= i; j++) {
            C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
        }
    }
    let length = k;
    while (C[length][k] < n) {
        length++;
    }
    let r = n - C[length - 1][k];
    let ans = 2 ** (length - 1);
    let need = k - 1;
    for (let p = length - 2; p >= 0; p--) {
        if (r > C[p][need]) {
            r -= C[p][need];
            ans += 2 ** p;
            need--;
        }
    }
    return ans;
};
