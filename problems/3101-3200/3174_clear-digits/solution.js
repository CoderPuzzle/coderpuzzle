/**
 * @param {string} s
 * @return {string}
 */
var clearDigits = function (s) {
    // Survivors so far form a stack; a digit always removes the closest
    // non-digit still standing to its left, which is exactly its top.
    const kept = [];
    for (let i = 0; i < s.length; ++i) {
        const ch = s[i];
        if (ch >= "0" && ch <= "9") {
            kept.pop();
        } else {
            kept.push(ch);
        }
    }
    return kept.join("");
};
