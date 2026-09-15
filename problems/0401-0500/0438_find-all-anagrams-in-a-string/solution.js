/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    const length = p.length;
    const n = s.length;
    const result = [];
    if (n < length) return result;
    const delta = new Array(128).fill(0);
    for (const ch of p) delta[ch.charCodeAt(0)]++;
    let diff = 0;
    for (const d of delta) if (d !== 0) diff++;
    for (let i = 0; i < n; i++) {
        let c = s.charCodeAt(i);
        if (delta[c] === 0) diff++;
        delta[c]--;
        if (delta[c] === 0) diff--;
        if (i >= length) {
            const out = s.charCodeAt(i - length);
            if (delta[out] === 0) diff++;
            delta[out]++;
            if (delta[out] === 0) diff--;
        }
        if (i >= length - 1 && diff === 0) result.push(i - length + 1);
    }
    return result;
};
