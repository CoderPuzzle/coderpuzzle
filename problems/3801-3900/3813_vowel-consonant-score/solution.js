/**
 * @param {string} s
 * @return {number}
 */
var vowelConsonantScore = function (s) {
    // One pass tallies both totals: each character either is one of
    // the five vowels and bumps v, is another lowercase letter and
    // bumps c, or is a space or digit and bumps neither. The score is
    // then the integer quotient floor(v / c), or 0 when no consonant
    // exists to divide by.
    let v = 0;
    let c = 0;
    for (const ch of s) {
        if ("aeiou".includes(ch)) {
            v += 1;
        } else if (ch >= "a" && ch <= "z") {
            c += 1;
        }
    }
    return c > 0 ? Math.floor(v / c) : 0;
};
