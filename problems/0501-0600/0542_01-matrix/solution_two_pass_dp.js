/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const m = mat.length,
        n = mat[0].length;
    // No cell sits farther than m*n steps from a zero, so that value
    // stands in for "not yet settled" without colliding with a real
    // distance; zero cells start settled at 0.
    const far = m * n + 1;
    const dist = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => (mat[i][j] === 0 ? 0 : far)));
    // Forward sweep: each cell learns from the top and left neighbours,
    // so every zero up and to the left has already done its work here.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0) dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
            if (j > 0) dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
        }
    }
    // Backward sweep: the same argument with the bottom and right
    // neighbours, so a nearest zero in any direction has now been
    // heard from — whichever sweep met the closer zero wins.
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i < m - 1) dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
            if (j < n - 1) dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
        }
    }
    return dist;
};
