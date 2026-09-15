/**
 * @param {string} source
 * @param {string} pattern
 * @param {number[]} targetIndices
 * @return {number}
 */
var maxRemovals = function (source, pattern, targetIndices) {
    // Walk source once keeping, for every prefix length k of pattern,
    // the most removals achievable with k characters already matched.
    // Every position carries each state over unchanged (the character
    // can always be kept unused), adds one when the position is a
    // removable target that gets deleted, and moves state k to k + 1
    // when the character equals pattern[k]. Unreachable states sit at
    // NEG, whose drift stays far below zero across the whole scan.
    const NEG = -(1 << 30);
    const n = source.length;
    const m = pattern.length;
    const removable = new Uint8Array(n);
    for (const idx of targetIndices) removable[idx] = 1;
    let prev = new Int32Array(m + 1).fill(NEG);
    prev[0] = 0;
    for (let i = 0; i < n; i++) {
        let cut = prev;
        if (removable[i]) {
            cut = new Int32Array(m + 1);
            for (let k = 0; k <= m; k++) cut[k] = prev[k] + 1;
        }
        const cur = new Int32Array(m + 1);
        const c = source[i];
        for (let k = 0; k <= m; k++) {
            let best = cut[k];
            if (k && c === pattern[k - 1] && prev[k - 1] > best) {
                best = prev[k - 1];
            }
            cur[k] = best;
        }
        prev = cur;
    }
    return prev[m];
};
