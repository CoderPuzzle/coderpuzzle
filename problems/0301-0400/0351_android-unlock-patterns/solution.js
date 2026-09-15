/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var numberOfPatterns = function (m, n) {
    // skip[a][b]: the dot whose center the segment a-b passes straight
    // through (0 when it passes through none) — the eight pairs whose
    // endpoints lie on one row, column, or diagonal with a dot between.
    const skip = Array.from({ length: 10 }, () => new Array(10).fill(0));
    skip[1][3] = skip[3][1] = 2;
    skip[1][7] = skip[7][1] = 4;
    skip[3][9] = skip[9][3] = 6;
    skip[7][9] = skip[9][7] = 8;
    skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = 5;
    skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5;

    // The prefix built so far already counts as one pattern once it holds
    // m dots; it can keep growing only while under n.
    const walk = (used, last, length) => {
        let total = length >= m ? 1 : 0;
        if (length === n) return total;
        for (let next = 1; next <= 9; ++next) {
            // `used` always has bit 0 set: a phantom dot standing for "no
            // dot in between", so skip 0 passes the same already-visited
            // check as every real blocking dot.
            if (((used >> next) & 1) === 0 && ((used >> skip[last][next]) & 1) === 1) {
                total += walk(used | (1 << next), next, length + 1);
            }
        }
        return total;
    };

    // Rotations and reflections of the grid preserve every blocking
    // relation while permuting corners among themselves and edge midpoints
    // among themselves, so three searches (corner 1, edge 2, center 5)
    // cover all nine starting dots.
    return 4 * walk(1 | (1 << 1), 1, 1) + 4 * walk(1 | (1 << 2), 2, 1) + walk(1 | (1 << 5), 5, 1);
};
