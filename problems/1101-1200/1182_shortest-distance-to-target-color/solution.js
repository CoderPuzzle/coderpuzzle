/**
 * @param {number[]} colors
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceColor = function (colors, queries) {
    var INF = Number.MAX_SAFE_INTEGER;
    var n = colors.length;
    // dist[i][c]: distance from i to nearest color c (1..3).
    var dist = [];
    for (var i = 0; i < n; i++) {
        dist.push([0, INF, INF, INF]);
    }
    for (var c = 1; c <= 3; c++) {
        // Left-to-right sweep carrying the distance to the most recent
        // occurrence of c.
        var last = INF;
        for (var i2 = 0; i2 < n; i2++) {
            if (colors[i2] === c) {
                last = 0;
            } else if (last !== INF) {
                last++;
            }
            dist[i2][c] = last;
        }
        // Mirror sweep keeps whichever side owns the closer one.
        last = INF;
        for (var i3 = n - 1; i3 >= 0; i3--) {
            if (colors[i3] === c) {
                last = 0;
            } else if (last !== INF) {
                last++;
            }
            if (last < dist[i3][c]) {
                dist[i3][c] = last;
            }
        }
    }
    return queries.map(function (q) {
        var d = dist[q[0]][q[1]];
        return d === INF ? -1 : d;
    });
};
