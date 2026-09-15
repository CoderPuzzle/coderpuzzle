/**
 * @param {number} n
 * @param {number} threshold
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var areConnected = function (n, threshold, queries) {
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    const union = (a, b) => {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            parent[ra] = rb;
        }
    };

    for (let z = threshold + 1; z <= n; z++) {
        if (z > 1 && find(z) !== z) {
            continue;
        }
        for (let multiple = 2 * z; multiple <= n; multiple += z) {
            union(z, multiple);
        }
    }

    return queries.map(([a, b]) => find(a) === find(b));
};
