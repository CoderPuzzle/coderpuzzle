/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    // Walk t once, advancing a pointer into s on every match; greedy is
    // safe — matching each character at its earliest legal position in t
    // never hurts a later one.
    let i = 0;
    for (let j = 0; j < t.length && i < s.length; ++j) {
        if (t[j] === s[i]) {
            i++;
        }
    }
    // All of s was matched in order iff the pointer reached its end.
    return i === s.length;
};
