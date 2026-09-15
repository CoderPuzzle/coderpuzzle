/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
    const bannedSet = new Set(banned);
    const counts = new Map();
    let bestWord = "";
    let bestCount = 0;
    // The trailing space closes a word still open when the paragraph
    // ends, so the loop never needs a separate flush.
    let word = "";
    const padded = paragraph + " ";
    for (let i = 0; i < padded.length; i++) {
        const code = padded.charCodeAt(i);
        // ASCII puts every uppercase letter 32 codes above its lowercase
        // twin, so one range check + 32 folds the case; every other
        // character matches neither range and cuts the word instead of
        // joining it.
        if (code >= 65 && code <= 90) {
            word += String.fromCharCode(code + 32);
        } else if (code >= 97 && code <= 122) {
            word += padded[i];
        } else if (word !== "") {
            const end = word;
            word = "";
            if (!bannedSet.has(end)) {
                const count = (counts.get(end) || 0) + 1;
                counts.set(end, count);
                // Strictly greater keeps the earlier word on equal
                // counts; the statement guarantees the answer is unique,
                // so no tie ever reaches this comparison.
                if (count > bestCount) {
                    bestCount = count;
                    bestWord = end;
                }
            }
        }
    }
    return bestWord;
};
