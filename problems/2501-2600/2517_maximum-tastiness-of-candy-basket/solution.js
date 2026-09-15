/**
 * @param {number[]} price
 * @param {number} k
 * @return {number}
 */
var maximumTastiness = function (price, k) {
    // In a sorted selection the minimum pairwise gap always occurs between
    // adjacent picks, so sorting once reduces the problem to chain gaps.
    const p = price.slice().sort((a, b) => a - b);
    const feasible = (x) => {
        // Leftmost greedy: take the first candy, then each candy at least x
        // above the last taken one. Postponing a pick can only shrink the room
        // for later picks, so this maximizes how many candies fit.
        let count = 1;
        let last = p[0];
        for (let i = 1; i < p.length; i++) {
            if (p[i] - last >= x) {
                count++;
                last = p[i];
            }
        }
        return count >= k;
    };
    // "Every gap >= x is achievable" is monotone in x, so binary search the
    // largest feasible x over [0, max-min]; the upper-mid +1 keeps lo = mid
    // from stalling. Identical prices converge to lo = 0.
    let lo = 0,
        hi = p[p.length - 1] - p[0];
    while (lo < hi) {
        const mid = (lo + (hi - lo + 1) / 2) | 0;
        if (feasible(mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
};
