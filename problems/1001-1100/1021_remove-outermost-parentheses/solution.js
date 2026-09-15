/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
    let result = "";
    let depth = 0;
    for (const ch of s) {
        if (ch === "(") {
            // Keep it only if some other primitive block is already open;
            // an outermost '(' opens at depth 0 and is dropped.
            if (depth > 0) {
                result += ch;
            }
            depth++;
        } else {
            // Close the block first, then keep the character only if it
            // did not just bring the depth back to 0.
            depth--;
            if (depth > 0) {
                result += ch;
            }
        }
    }
    return result;
};
