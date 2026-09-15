/**
 * @param {string} s
 * @return {number}
 */
var sumScores = function (s) {
    const n = s.length;
    if (n === 0) return 0;
    const z = new Array(n).fill(0);
    // s_n = s is its own longest prefix; each s_i is a suffix scoring z[n - i]
    z[0] = n;
    let left = 0,
        right = 0;
    for (let i = 1; i < n; i++) {
        if (i < right) {
            // inside the window [left, right): reuse the mirrored z[i - left],
            // capped at right - i so the guess stays within verified territory
            z[i] = Math.min(right - i, z[i - left]);
        }
        // extend by direct comparison as far as the match truly goes
        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
            z[i] += 1;
        }
        // track the rightmost window; its forward growth bounds work by O(n)
        if (i + z[i] > right) {
            left = i;
            right = i + z[i];
        }
    }
    let total = 0;
    for (const v of z) total += v;
    return total;
};
