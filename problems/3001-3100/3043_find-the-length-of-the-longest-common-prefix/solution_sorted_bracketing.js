/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function (arr1, arr2) {
    // The deepest cross-array agreement is realized by two lexicographically
    // adjacent entries, so merge both arrays as source-tagged digit strings.
    const entries = [];
    for (const x of arr1) entries.push([String(x), 0]);
    for (const y of arr2) entries.push([String(y), 1]);
    // Sort as digit strings, never numerically: only lexicographic order
    // keeps a prefix family in one contiguous block.
    entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    let best = 0;
    for (let i = 1; i < entries.length; i++) {
        const [u, su] = entries[i - 1];
        const [v, sv] = entries[i];
        // Same-source neighbors cannot witness a cross pair.
        if (su === sv) continue;
        let shared = 0;
        for (let j = 0; j < u.length && j < v.length; j++) {
            if (u[j] !== v[j]) {
                // Digits diverge: the run cannot extend past here.
                break;
            }
            shared++;
        }
        if (shared > best) best = shared;
    }
    return best;
};
