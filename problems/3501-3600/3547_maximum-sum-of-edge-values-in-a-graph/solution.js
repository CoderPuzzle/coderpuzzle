/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var maxScore = function (n, edges) {
    // Connected with every degree <= 2, the graph is one path (m == n-1)
    // or one cycle (m == n). Pendulum the values 1..n — 1, 3, 5, ...
    // then ..., 6, 4, 2 — so the largest values sit side by side. Every
    // product <= n^2 = 2.5e9 and the total <= n^3 = 1.25e14 < 2^53, so
    // Number arithmetic is exact.
    const seq = [];
    for (let v = 1; v <= n; v += 2) seq.push(v);
    for (let v = n % 2 === 0 ? n : n - 1; v >= 2; v -= 2) seq.push(v);
    let score = 0;
    for (let i = 0; i + 1 < n; i++) score += seq[i] * seq[i + 1];
    if (edges.length === n) score += seq[0] * seq[n - 1];
    return score;
};
