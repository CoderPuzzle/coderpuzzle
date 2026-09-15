/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var sameEndSubstringCount = function (s, queries) {
    // cnt[c][j] = occurrences of letter c in s[:j]. A query answer is the
    // sum over letters of t*(t+1)/2 for the range frequency t: every
    // position pairs with itself, and each equal pair of positions is one
    // same-end substring. Max answer 450015000 stays exact in a Number.
    const n = s.length;
    const cnt = Array.from({ length: 26 }, () => new Array(n + 1).fill(0));
    for (let j = 1; j <= n; ++j) {
        for (let c = 0; c < 26; ++c) {
            cnt[c][j] = cnt[c][j - 1];
        }
        ++cnt[s.charCodeAt(j - 1) - 97][j];
    }
    const ans = [];
    for (const [l, r] of queries) {
        let total = 0;
        for (let c = 0; c < 26; ++c) {
            const t = cnt[c][r + 1] - cnt[c][l];
            total += (t * (t + 1)) / 2;
        }
        ans.push(total);
    }
    return ans;
};
