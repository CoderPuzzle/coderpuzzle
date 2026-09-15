/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    // The prefix cannot outlive the shortest string, so scanning column by
    // column stops exactly at the first position any string disagrees on or
    // ends.
    const first = strs[0];
    for (let column = 0; column < first.length; ++column) {
        const ch = first[column];
        // A shorter string ending here is as final as a mismatch: nothing
        // can extend the prefix past its last character.
        for (let i = 1; i < strs.length; ++i) {
            const s = strs[i];
            if (column === s.length || s[column] !== ch) {
                return first.slice(0, column);
            }
        }
    }
    // Every column of the first string survived every other string.
    return first;
};
