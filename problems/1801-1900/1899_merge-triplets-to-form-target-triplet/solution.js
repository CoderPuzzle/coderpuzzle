/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function (triplets, target) {
    // Drop overshooters; the survivors' componentwise max is the
    // best-reachable triplet.
    const best = [0, 0, 0];
    for (const [a, b, c] of triplets) {
        if (a <= target[0] && b <= target[1] && c <= target[2]) {
            best[0] = Math.max(best[0], a);
            best[1] = Math.max(best[1], b);
            best[2] = Math.max(best[2], c);
        }
    }
    return best[0] === target[0] && best[1] === target[1] && best[2] === target[2];
};
