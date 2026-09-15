/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
var maxDistance = function (position, m) {
    position = position.slice().sort((a, b) => a - b);

    const feasible = (distance) => {
        // Greedy: the first ball sits at the leftmost basket (count = 1),
        // then each ball takes the first basket at least `distance` beyond
        // the last placed one. Earliest-possible placement is never worse,
        // so failure here means no placement works.
        let count = 1;
        let last = position[0];
        for (let i = 1; i < position.length; i++) {
            if (position[i] - last >= distance) {
                count++;
                last = position[i];
                if (count >= m) {
                    // All balls placed — exit early.
                    return true;
                }
            }
        }
        return count >= m;
    };

    // Feasibility is monotone in the spacing, so binary search the largest
    // feasible d over [1, span]; the upper-mid form keeps the search moving
    // when lo and hi become adjacent.
    let lo = 1;
    let hi = position[position.length - 1] - position[0];
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (feasible(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
