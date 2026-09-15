/**
 * @param {number[]} edges
 * @return {number}
 */
var edgeScore = function (edges) {
    // Node edges[i] gains i to its score, so one accumulation pass fills
    // every score; a second pass picks the highest with the smallest index
    // (strict > keeps the earlier node on ties). The maximum score is
    // 1 + 2 + ... + 99999 ≈ 5e9, far inside Number's exact range.
    const scores = new Array(edges.length).fill(0);
    for (let source = 0; source < edges.length; ++source) {
        scores[edges[source]] += source;
    }
    let bestNode = 0;
    for (let node = 1; node < scores.length; ++node) {
        if (scores[node] > scores[bestNode]) {
            bestNode = node;
        }
    }
    return bestNode;
};
