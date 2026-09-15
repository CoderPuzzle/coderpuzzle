/**
 * @param {string[]} words
 * @return {string}
 */
var oddString = function (words) {
    // Encode each word as its difference signature (the n-1 consecutive
    // letter differences); the odd word is the one whose signature appears
    // exactly once.
    const sigs = words.map((w) => {
        let sig = "";
        for (let i = 1; i < w.length; i++) {
            sig += w.charCodeAt(i) - w.charCodeAt(i - 1) + ",";
        }
        return sig;
    });
    const count = new Map();
    sigs.forEach((s) => count.set(s, (count.get(s) || 0) + 1));
    for (let i = 0; i < words.length; i++) {
        if (count.get(sigs[i]) === 1) return words[i];
    }
    return "";
};
