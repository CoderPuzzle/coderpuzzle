/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
var largestPathValue = function (colors, edges) {
    var n = colors.length;
    var graph = new Array(n);
    for (var i = 0; i < n; i++) graph[i] = [];
    var indeg = new Array(n).fill(0);
    for (var e = 0; e < edges.length; e++) {
        var a = edges[e][0],
            b = edges[e][1];
        graph[a].push(b);
        indeg[b]++;
    }
    // dp[u][c] = max number of color-c nodes on any path ending at u.
    // Kahn's order guarantees every predecessor of u is finalized before
    // u is processed, so the row pushed out of u is final.
    var dp = new Array(n);
    for (var j = 0; j < n; j++) dp[j] = new Array(26).fill(0);

    var queue = [];
    for (var k = 0; k < n; k++) if (indeg[k] === 0) queue.push(k);
    var head = 0,
        visited = 0,
        ans = 0;
    while (head < queue.length) {
        var u = queue[head++];
        visited++;
        // u extends every incoming path, so count its own color.
        dp[u][colors.charCodeAt(u) - 97]++;
        var du = dp[u];
        // A valid path may end at any node — the row's best entry is a
        // candidate (this is what lets single-node paths count).
        for (var c1 = 0; c1 < 26; c1++) if (du[c1] > ans) ans = du[c1];
        var gu = graph[u];
        for (var g = 0; g < gu.length; g++) {
            var v = gu[g];
            var dv = dp[v];
            // Element-wise max-merge into the neighbor's row.
            for (var c = 0; c < 26; c++) if (du[c] > dv[c]) dv[c] = du[c];
            if (--indeg[v] === 0) queue.push(v);
        }
    }
    // Nodes on or downstream of a cycle never reach indegree zero.
    return visited === n ? ans : -1;
};
