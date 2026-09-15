/**
 * @param {string} s
 * @return {number}
 */
var uniqueLetterString = function (s) {
    // Reorganize the sum per occurrence: a letter adds 1 exactly
    // for substrings in which it appears precisely once. Bucket
    // the indices of each letter.
    const positions = [];
    for (let c = 0; c < 26; c++) {
        positions.push([]);
    }
    for (let i = 0; i < s.length; i++) {
        positions[s.charCodeAt(i) - 65].push(i);
    }
    const n = s.length;
    let total = 0;
    for (let pos of positions) {
        if (pos.length === 0) {
            continue;
        }
        // Sentinels -1 and n give the first and last occurrences
        // the same window arithmetic.
        pos = [-1].concat(pos, [n]);
        for (let k = 1; k < pos.length - 1; k++) {
            // i-p left endpoints after the previous equal letter,
            // q-i right endpoints before the next: each
            // (substring, unique char) pair counted exactly once.
            total += (pos[k] - pos[k - 1]) * (pos[k + 1] - pos[k]);
        }
    }
    return total;
};
