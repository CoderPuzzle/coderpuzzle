/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isReflected = function (points) {
    // Reflection swaps the extreme columns, so the only axis that can
    // work is x = (min_x + max_x) / 2: pin the sum s = min_x + max_x.
    const xs = points.map((point) => point[0]);
    const s = Math.min(...xs) + Math.max(...xs);
    const seen = new Set(points.map((point) => point.join(",")));
    // The axis may fall between columns, so mirror with the integer sum:
    // every point needs its partner (s - x, y) in the set, where repeated
    // points simply collapse.
    return points.every((point) => seen.has(`${s - point[0]},${point[1]}`));
};
