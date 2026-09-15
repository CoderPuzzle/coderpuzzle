/**
 * @param {string} s
 * @return {number}
 */
var countPalindromes = function (s) {
    // A length-5 palindrome has the shape a b c b a. Iterate over each
    // position as the center c: the "ab" pair must sit strictly before it
    // and the "ba" pair strictly after. A suffix table answers the right
    // side for every center in 100 lookups; the left side grows on the fly
    // during the same left-to-right sweep. Every pair count stays below
    // C(10^4, 2) < 2^53, so the products are exact in JS.
    const MOD = 1000000007;
    const n = s.length;
    const digits = new Array(n);
    for (let i = 0; i < n; ++i) digits[i] = s.charCodeAt(i) - 48;

    // suff[i][a][b] = number of "ab" subsequences in s[i:]
    const suff = Array.from({ length: n + 1 }, () => Array.from({ length: 10 }, () => new Array(10).fill(0)));
    const cnt = new Array(10).fill(0); // digit counts in the current suffix s[i:]
    for (let i = n - 1; i >= 0; --i) {
        const d = digits[i];
        const cur = suff[i];
        const nxt = suff[i + 1];
        for (let a = 0; a < 10; ++a) cur[a] = nxt[a].slice();
        for (let b = 0; b < 10; ++b) cur[d][b] += cnt[b]; // pairs (i, j) whose first char is s[i]
        cnt[d] += 1;
    }

    // left[a][b] = number of "ab" subsequences in s[:k]
    const left = Array.from({ length: 10 }, () => new Array(10).fill(0));
    const lcnt = new Array(10).fill(0); // digit counts in s[:k]
    let ans = 0;
    for (let k = 0; k < n; ++k) {
        const d = digits[k];
        const sfx = suff[k + 1];
        for (let a = 0; a < 10; ++a) {
            for (let b = 0; b < 10; ++b) {
                ans = (ans + left[a][b] * sfx[b][a]) % MOD;
            }
        }
        for (let a = 0; a < 10; ++a) left[a][d] += lcnt[a]; // pairs (p, k) whose second char is s[k]
        lcnt[d] += 1;
    }
    return ans;
};
