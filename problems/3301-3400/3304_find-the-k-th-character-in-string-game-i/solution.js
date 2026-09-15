/**
 * @param {number} k
 * @return {string}
 */
var kthCharacter = function (k) {
    // Simulate the operation directly: each pass appends a copy of the
    // current word with every letter advanced to its next character
    // (wrapping z back to a), so the length doubles. Nine passes already
    // exceed k = 500 since 2^9 = 512, and characters never change once
    // written, so when the word first reaches length k the character at
    // index k - 1 is the answer.
    let word = "a";
    while (word.length < k) {
        let half = "";
        for (const c of word) {
            half += c === "z" ? "a" : String.fromCharCode(c.charCodeAt(0) + 1);
        }
        word += half;
    }
    return word[k - 1];
};
