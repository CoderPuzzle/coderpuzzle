/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStarSum = function (vals, edges, k) {
    const neighbors = vals.map(() => []);
    // Store neighbor values (not indices) while reading edges, so each
    // center later sees its candidates directly.
    for (const [a, b] of edges) {
        neighbors[a].push(vals[b]);
        neighbors[b].push(vals[a]);
    }
    // The center alone is a legal star: seed with the best single
    // value, never 0, so all-negative inputs stay negative.
    let best = -Infinity;
    for (const v of vals) {
        if (v > best) best = v;
    }
    for (let i = 0; i < vals.length; i++) {
        // For a fixed center the best subset is greedy: sorted
        // descending, take neighbors while they help.
        const adjacent = neighbors[i].sort((x, y) => y - x);
        let total = vals[i];
        const take = Math.min(k, adjacent.length);
        for (let j = 0; j < take; j++) {
            // A non-positive neighbor can only lower the sum.
            if (adjacent[j] <= 0) break;
            total += adjacent[j];
        }
        if (total > best) best = total;
    }
    return best;
};
