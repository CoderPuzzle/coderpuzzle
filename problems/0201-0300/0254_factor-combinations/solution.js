/**
 * @param {number} n
 * @return {number[][]}
 */
var getFactors = function (n) {
    const combinations = [];
    const current = [];
    // start is the smallest factor still allowed, so factors only grow and
    // every emitted list is ascending.
    const backtrack = (remaining, start) => {
        for (let factor = start; factor * factor <= remaining; factor++) {
            if (remaining % factor !== 0) continue;
            // factor closes a combination: the cofactor remaining / factor is
            // at least factor, so both stay in [2, n - 1] and the list stays
            // ascending.
            combinations.push([...current, factor, remaining / factor]);
            current.push(factor);
            // Split the cofactor further; the new start stays at factor so
            // the next factor is at least as large.
            backtrack(remaining / factor, factor);
            current.pop();
        }
    };
    backtrack(n, 2);
    // Left-to-right growth emits each length group in lexicographic order
    // but interleaves the groups; the pinned display wants fewest factors
    // first, so reassemble by (length, lexicographic).
    const byLengthThenLex = (a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        for (let k = 0; k < a.length; k++) {
            if (a[k] !== b[k]) return a[k] - b[k];
        }
        return 0;
    };
    combinations.sort(byLengthThenLex);
    return combinations;
};
