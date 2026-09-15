/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasSpecialSubstring = function (s, k) {
    // A one-character window must span a whole maximal run: starting
    // inside the run leaves the same character before it, ending inside
    // leaves the same character after it. So the answer is "some maximal
    // run has length exactly k".
    const n = s.length;
    let i = 0;
    while (i < n) {
        let j = i;
        while (j < n && s[j] === s[i]) {
            j++;
        }
        if (j - i === k) {
            return true;
        }
        i = j;
    }
    return false;
};
