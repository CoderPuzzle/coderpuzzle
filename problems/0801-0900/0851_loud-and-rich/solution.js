/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
var loudAndRich = function (richer, quiet) {
    // Each pair [a, b] is an edge from a richer person to a poorer one,
    // so the people definitely at least as rich as x are x plus all its
    // ancestors in the DAG. A Kahn sweep settles persons from the
    // known-richest downward: once every richer neighbor of b has
    // relaxed its answer into b, answer[b] holds the least quiet person
    // among them all.
    const n = quiet.length;
    const poorer = Array.from({ length: n }, () => []);
    const pending = new Array(n).fill(0);
    for (const [a, b] of richer) {
        poorer[a].push(b);
        ++pending[b];
    }
    const answer = Array.from({ length: n }, (_, x) => x);
    const settled = [];
    for (let x = 0; x < n; ++x) {
        if (pending[x] === 0) {
            settled.push(x);
        }
    }
    for (let i = 0; i < settled.length; ++i) {
        const x = settled[i];
        for (const b of poorer[x]) {
            if (quiet[answer[x]] < quiet[answer[b]]) {
                answer[b] = answer[x];
            }
            --pending[b];
            if (pending[b] === 0) {
                settled.push(b);
            }
        }
    }
    return answer;
};
