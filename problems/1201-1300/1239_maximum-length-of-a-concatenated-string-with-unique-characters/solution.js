/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
    // A concatenation is fully described by which of the 26 letters it
    // holds, so each string becomes a bitmask; a self-repeating string
    // (mask -1) can never join a valid combination and is skipped later.
    const masks = [];
    for (const s of arr) {
        let mask = 0;
        let bad = false;
        for (const ch of s) {
            const bit = 1 << (ch.charCodeAt(0) - 97);
            if (mask & bit) {
                bad = true;
                break;
            }
            mask |= bit;
        }
        masks.push(bad ? -1 : mask);
    }

    const n = arr.length;
    let best = 0;

    const dfs = (index, used) => {
        // The combination length is just the popcount of its mask
        // (Kernighan loop clears one bit per iteration).
        let total = 0;
        for (let b = used; b; b &= b - 1) total++;
        if (total > best) best = total;
        // The start index only moves forward: each subsequence is tried
        // once in index order (length is order-independent). Compatible
        // strings are exactly those whose mask ANDs with `used` to zero.
        for (let j = index; j < n; j++) {
            if (masks[j] !== -1 && (used & masks[j]) === 0) {
                dfs(j + 1, used | masks[j]);
            }
        }
    };

    dfs(0, 0);
    return best;
};
