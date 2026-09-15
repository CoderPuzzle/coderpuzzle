/**
 * @param {string} s
 * @param {string} c
 * @return {number}
 */
var countSubstrings = function (s, c) {
    // Only the positions of c matter: a substring starts and ends with c
    // exactly when both endpoints land on an occurrence, so choosing a
    // substring is choosing two (not necessarily distinct) occurrences,
    // in order. With m occurrences that is m*(m+1)/2 pairs, which can
    // reach 5000050000 at n = 100000 — beyond 32-bit, and safely below
    // 2**53, so Number arithmetic stays exact.
    let m = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === c[0]) m++;
    }
    return (m * (m + 1)) / 2;
};
