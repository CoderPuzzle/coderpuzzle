/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestWordDistance = function (wordsDict, word1, word2) {
    // One pass remembering the most recent position of each word. Here
    // word1 and word2 may be the same word, and that case is the twist.
    const same = word1 === word2;
    let index1 = -1;
    let index2 = -1;
    // The two queried words occupy two distinct indices, so no real gap
    // reaches the length of the list — it is a safe unreachable bound.
    let best = wordsDict.length;
    for (let index = 0; index < wordsDict.length; ++index) {
        const word = wordsDict[index];
        if (word === word1) {
            if (same) {
                // Equal words: the previous occurrence now plays the
                // counterpart, so only gaps between consecutive
                // occurrences of the one word are ever compared.
                index2 = index1;
            }
            index1 = index;
        } else if (word === word2) {
            index2 = index;
        }
        if (index1 >= 0 && index2 >= 0) {
            // A fresh occurrence is closest to the latest occurrence
            // behind it; older ones lie farther back, so this single gap
            // is the only candidate the new occurrence adds.
            const gap = Math.abs(index1 - index2);
            if (gap < best) {
                best = gap;
            }
        }
    }
    return best;
};
