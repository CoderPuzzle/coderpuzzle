/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
    // Each second closes at most one unit of each axis (the diagonal), so
    // a leg takes exactly max(|dx|, |dy|) seconds — walk diagonally while
    // both gaps are open, then straight along what remains.
    let total = 0;
    for (let i = 1; i < points.length; ++i) {
        total += Math.max(Math.abs(points[i][0] - points[i - 1][0]), Math.abs(points[i][1] - points[i - 1][1]));
    }
    return total;
};
