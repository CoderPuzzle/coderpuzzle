/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} queries
 * @return {number[]}
 */
var countPairs = function (n, edges, queries) {
    // Degrees count every parallel edge separately, so for a pair (a, b) the
    // degree sum counts an edge shared by both endpoints twice: incident(a, b)
    // = deg[a] + deg[b] - mult(a, b). For each pair joined by at least one
    // edge, s is the degree sum and t the true incident count; a query k
    // overcounts exactly the pairs with t <= k < s, so the fix adds #{s <= k}
    // - #{t <= k}. Counts stay below 2 * 10^8, far under 2^53, so plain
    // numbers are exact.
    const deg = new Array(n + 1).fill(0);
    const mult = new Map();
    for (const [u, v] of edges) {
        deg[u]++;
        deg[v]++;
        const key = u < v ? u * (n + 1) + v : v * (n + 1) + u;
        mult.set(key, (mult.get(key) || 0) + 1);
    }
    const d = deg.slice(1).sort((x, y) => x - y);
    const sVals = [];
    const tVals = [];
    for (const [key, m] of mult) {
        const a = Math.floor(key / (n + 1));
        const b = key % (n + 1);
        const s = deg[a] + deg[b];
        sVals.push(s);
        tVals.push(s - m);
    }
    sVals.sort((x, y) => x - y);
    tVals.sort((x, y) => x - y);
    const upperBound = (a, k) => {
        let lo = 0;
        let hi = a.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (a[mid] <= k) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    return queries.map((k) => {
        // Two pointers over the sorted degrees count every unordered pair
        // whose degree sum is strictly above k.
        let lo = 0;
        let hi = n - 1;
        let total = 0;
        while (lo < hi) {
            if (d[lo] + d[hi] > k) {
                total += hi - lo;
                hi--;
            } else {
                lo++;
            }
        }
        total += upperBound(sVals, k) - upperBound(tVals, k);
        return total;
    });
};
