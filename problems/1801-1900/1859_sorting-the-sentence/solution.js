/**
 * @param {string} s
 * @return {string}
 */
var sortSentence = function (s) {
    // The trailing digit is the 1-indexed slot; drop each word into its
    // slot and rejoin.
    const words = s.split(" ");
    const out = new Array(words.length);
    for (const w of words) {
        out[w.charCodeAt(w.length - 1) - 49] = w.slice(0, -1);
    }
    return out.join(" ");
};
