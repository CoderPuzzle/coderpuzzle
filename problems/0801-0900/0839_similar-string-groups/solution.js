/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs) {
    // All words are mutual anagrams, so they are similar iff they
    // differ in 0 or 2 positions — exactly what one swap fixes;
    // bail on the third mismatch.
    const similar = (a, b) => {
        let mismatches = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                mismatches++;
                if (mismatches > 2) {
                    return false;
                }
            }
        }
        return mismatches === 0 || mismatches === 2;
    };

    const n = strs.length;
    const parent = Array.from({ length: n }, (_, i) => i);

    // Path halving keeps repeated lookups nearly constant.
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    // Union every similar pair: groups are the transitive closure,
    // so indirectly similar words share a root.
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (similar(strs[i], strs[j])) {
                const ri = find(i);
                const rj = find(j);
                if (ri !== rj) {
                    parent[ri] = rj;
                }
            }
        }
    }

    // The answer is the number of distinct roots remaining.
    const roots = new Set();
    for (let i = 0; i < n; i++) {
        roots.add(find(i));
    }
    return roots.size;
};
