/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
    const parent = new Array(26).fill(0).map((_, i) => i);
    // Path halving: re-point each visited node at its grandparent so the
    // trees flatten as we walk.
    const find = (a) => {
        while (parent[a] !== a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    };
    for (let i = 0; i < s1.length; i++) {
        let ra = find(s1.charCodeAt(i) - 97);
        let rb = find(s2.charCodeAt(i) - 97);
        if (ra !== rb) {
            // The union rule encodes the answer: always attach the larger root
            // under the smaller one, so a component's root is its
            // lexicographically smallest letter.
            if (rb < ra) {
                const t = ra;
                ra = rb;
                rb = t;
            }
            parent[rb] = ra;
        }
    }
    // Each character maps to its component root — the smallest equivalent
    // letter (singletons map to themselves).
    let out = "";
    for (let i = 0; i < baseStr.length; i++) {
        out += String.fromCharCode(97 + find(baseStr.charCodeAt(i) - 97));
    }
    return out;
};
