/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
    // The count of open '(' cannot be followed exactly through '*': every
    // star widens it into a range. lo tracks the fewest opens some assignment
    // leaves reachable, hi the most — '(' raises both, ')' lowers both, and
    // '*' trades one side for the other. lo is clamped at 0 because a surplus
    // ')' can never be undone later, while hi < 0 means even reading every
    // '*' as '(' cannot absorb the ')' just seen — false on the spot. The
    // string is valid exactly when the final range still contains 0.
    let lo = 0;
    let hi = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === "(") {
            lo++;
            hi++;
        } else if (c === ")") {
            lo--;
            hi--;
        } else {
            lo--;
            hi++;
        }
        if (hi < 0) {
            return false;
        }
        if (lo < 0) {
            lo = 0;
        }
    }
    return lo === 0;
};
