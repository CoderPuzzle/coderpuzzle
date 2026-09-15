/**
 * @param {number} n
 * @param {number[]} queries
 * @return {number}
 */
var numberOfNodes = function (n, queries) {
    // Order does not matter -- only how many times each subtree was
    // flipped. A node v's final value is the parity of (flips queried on
    // v) + (flips queried on every ancestor of v), since each such query
    // covers v too. Count queries per label, then sweep labels 1..n
    // passing accumulated flip counts parent -> child; the tree shape
    // guarantees the parent index (v >> 1) is already finished.
    const counts = new Map();
    for (const q of queries) {
        counts.set(q, (counts.get(q) || 0) + 1);
    }
    const flips = new Int32Array(n + 1);
    let total = 0;
    for (let v = 1; v <= n; v++) {
        flips[v] = (v >= 2 ? flips[v >> 1] : 0) + (counts.get(v) || 0);
        if (flips[v] % 2 === 1) {
            total++;
        }
    }
    return total;
};
