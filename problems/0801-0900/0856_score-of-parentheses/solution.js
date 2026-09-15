/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function (s) {
    // The rules only add siblings and double wrapped wholes, so every score
    // is a sum over "()" cores, each worth 2^d where d is the number of
    // pairs open around it. One sweep keeps the open-paren depth; a ')'
    // whose predecessor is '(' has just closed a core, and the
    // post-decrement depth counts its wrappers — add 1 << depth.
    let score = 0;
    let depth = 0;
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === "(") {
            depth++;
        } else {
            depth--;
            if (s[i - 1] === "(") {
                score += 1 << depth;
            }
        }
    }
    return score;
};
