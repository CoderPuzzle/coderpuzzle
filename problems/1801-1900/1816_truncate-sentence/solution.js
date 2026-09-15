/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var truncateSentence = function (s, k) {
    // Cut right after the k-th word: each space closes one word, so the
    // k-th space (when it exists) sits exactly at the cut point.
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") {
            count++;
            if (count === k) {
                return s.slice(0, i);
            }
        }
    }
    return s;
};
