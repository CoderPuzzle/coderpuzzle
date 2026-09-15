/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
var validSquare = function (p1, p2, p3, p4) {
    const points = [p1, p2, p3, p4];
    const d2 = [];
    // Six pairs hide among four points — four sides and two diagonals.
    // Grouping by squared length compares exactly what distances
    // compare, so no square root ever gets the chance to round.
    for (let i = 0; i < 4; ++i) {
        for (let j = i + 1; j < 4; ++j) {
            const dx = points[j][0] - points[i][0];
            const dy = points[j][1] - points[i][1];
            d2.push(dx * dx + dy * dy);
        }
    }
    d2.sort((a, b) => a - b);
    // Sorted, a square is exactly the multiset a, a, a, a, b, b: the four
    // equal sides come first and the two equal diagonals after, with a > 0
    // so a collapsed point cannot pose as a side.
    return d2[0] > 0 && d2[0] === d2[3] && d2[4] === d2[5] && d2[3] !== d2[4];
};
