/**
 * @param {string} word
 * @return {number}
 */
var removeAlmostEqualCharacters = function (word) {
    // Scan left to right. Each almost-equal neighbor pair needs one
    // change; by rewriting word[i] to a letter almost-equal to neither
    // neighbor (always available: each neighbor forbids at most 3 of
    // 26 letters) one change settles both the pair behind and the pair
    // ahead of i, so the scan skips two positions after a change.
    let ops = 0;
    let i = 1;
    while (i < word.length) {
        if (Math.abs(word.charCodeAt(i) - word.charCodeAt(i - 1)) <= 1) {
            ++ops;
            i += 2;
        } else {
            ++i;
        }
    }
    return ops;
};
