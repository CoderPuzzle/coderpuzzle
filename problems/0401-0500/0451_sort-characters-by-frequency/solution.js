/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
    // The answer depends only on how often each character occurs, and the
    // alphabet is fixed — one slot per possible character, one pass.
    const counts = new Array(128).fill(0);
    for (const ch of s) {
        counts[ch.charCodeAt(0)]++;
    }
    // Frequency descending, ties broken by character ascending — the
    // pinned order that makes the expected output unique.
    const ranked = [...counts.keys()].sort((a, b) => counts[b] - counts[a] || a - b);
    let out = "";
    for (const c of ranked) {
        out += String.fromCharCode(c).repeat(counts[c]);
    }
    return out;
};
