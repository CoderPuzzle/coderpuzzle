/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
var findLongestWord = function (s, dictionary) {
    // Deleting characters from s leaves a subsequence, so a word is
    // formable exactly when it is one. Walk s once, matching each word
    // character at its earliest legal position — greedy is safe, and the
    // word forms iff the pointer runs off its end.
    let best = "";
    for (const word of dictionary) {
        let i = 0;
        for (let j = 0; j < s.length && i < word.length; ++j) {
            if (s[j] === word[i]) {
                i++;
            }
        }
        const formable = i === word.length;
        // Longer wins; equal lengths go to the lexicographically smaller
        // word. The empty seed makes the no-answer case return "".
        if (formable && (word.length > best.length || (word.length === best.length && word < best))) {
            best = word;
        }
    }
    return best;
};
