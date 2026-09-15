/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
var largestOverlap = function (img1, img2) {
    // A translation slides every 1 of one image by one shared vector, so
    // a 1 at (i1, j1) in img1 sits on a 1 at (i2, j2) in img2 exactly
    // under the shift that carries (i2, j2) onto (i1, j1) — the delta
    // between the two cells. Counting over all pairs of 1-cells how often
    // each delta occurs scores every shift at once, and the largest count
    // is the largest overlap. Delta components lie in [-29, 29], so the
    // packed key dr*100 + dc is injective.
    const n = img1.length;
    const ones1 = [];
    const ones2 = [];
    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            if (img1[i][j] === 1) ones1.push([i, j]);
            if (img2[i][j] === 1) ones2.push([i, j]);
        }
    }
    const counts = new Map();
    let best = 0;
    for (const [i1, j1] of ones1) {
        for (const [i2, j2] of ones2) {
            const delta = (i1 - i2) * 100 + (j1 - j2);
            const hits = (counts.get(delta) ?? 0) + 1;
            counts.set(delta, hits);
            if (hits > best) best = hits;
        }
    }
    return best;
};
