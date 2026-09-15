/**
 * @param {string[]} words
 * @return {number}
 */
var countPairs = function (words) {
    // Shifting a word by k adds k to every letter, so two words are
    // similar exactly when subtracting each word's own first letter
    // maps both onto the same normalized key: (c - word[0]) mod 26.
    const counts = new Map();
    for (const word of words) {
        const base = word.charCodeAt(0);
        let key = "";
        for (let i = 0; i < word.length; ++i) {
            key += String.fromCharCode(((word.charCodeAt(i) - base + 26) % 26) + 97);
        }
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    // Pairs live inside one class; n <= 10^5 bounds the total by
    // n(n-1)/2 < 5 * 10^9 < 2^53, and each per-class term c*(c-1)/2
    // stays under 5 * 10^9 too, so every arithmetic step is exact.
    let pairs = 0;
    for (const c of counts.values()) {
        pairs += (c * (c - 1)) / 2;
    }
    return pairs;
};
