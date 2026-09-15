/**
 * @param {string} s
 * @return {number}
 */
var minimumLength = function (s) {
    // While both ends carry the same character, consume its full
    // run on each side in one sweep. The process is forced: shorter
    // strips only delay the same end state.
    let l = 0,
        r = s.length - 1;
    while (l < r && s[l] === s[r]) {
        const c = s[l];
        while (l <= r && s[l] === c) {
            l++;
        }
        while (r >= l && s[r] === c) {
            r--;
        }
    }
    return r - l + 1;
};
