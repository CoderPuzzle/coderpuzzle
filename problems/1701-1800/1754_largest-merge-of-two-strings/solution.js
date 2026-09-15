/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var largestMerge = function (word1, word2) {
    // Take the next character from whichever REMAINING string is
    // lexicographically larger — the suffix comparison settles not
    // just differing heads but the tie case.
    const out = [];
    let a = word1;
    let b = word2;
    while (a.length > 0 && b.length > 0) {
        if (a > b) {
            out.push(a[0]);
            a = a.slice(1);
        } else {
            out.push(b[0]);
            b = b.slice(1);
        }
    }
    return out.join("") + a + b;
};
