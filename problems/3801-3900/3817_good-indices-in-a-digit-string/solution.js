/**
 * @param {string} s
 * @return {number[]}
 */
var goodIndices = function (s) {
    // A matching substring must be exactly as long as i's decimal
    // representation, so every index has just one candidate: the
    // suffix of that length ending at i. Comparing that window
    // against String(i) decides the index — representations never
    // carry a leading zero, so a window like "01" fails plainly
    // against the real digits of i.
    const res = [];
    for (let i = 0; i < s.length; i++) {
        const t = String(i);
        const j = i - t.length + 1;
        if (j >= 0 && s.startsWith(t, j)) {
            res.push(i);
        }
    }
    return res;
};
