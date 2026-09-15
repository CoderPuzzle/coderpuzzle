/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} label
 * @return {number}
 */
var maxLen = function (n, edges, label) {
    var adj = [];
    for (var i = 0; i < n; i++) adj.push([]);
    for (var e = 0; e < edges.length; e++) {
        var u0 = edges[e][0],
            v0 = edges[e][1];
        adj[u0].push(v0);
        adj[v0].push(u0);
    }
    var codes = [];
    for (var c = 0; c < n; c++) codes.push(label.charCodeAt(c));
    var memo = new Int8Array((1 << n) * n * n);
    for (var f = 0; f < memo.length; f++) memo[f] = -1;

    function popcount(x) {
        var cnt = 0;
        while (x !== 0) {
            x &= x - 1;
            cnt++;
        }
        return cnt;
    }

    // dp(mask, left, right): best length reachable when mask is the visited set
    // and left/right are the path endpoints. Invariant: the visited nodes spell
    // a palindrome read from left to right.
    function dp(mask, left, right) {
        var idx = (mask * n + left) * n + right;
        if (memo[idx] >= 0) return memo[idx];
        // The standing path already spells a palindrome, so its length is the
        // floor every extension must beat.
        var best = popcount(mask);
        var lu = adj[left];
        var rv = adj[right];
        // Grow outward by one matched pair: u glues onto the left end, v onto
        // the right end; they must be distinct, unvisited, and equally labeled
        // so the path stays palindromic.
        for (var a = 0; a < lu.length; a++) {
            var u = lu[a];
            if (((mask >> u) & 1) !== 0) continue;
            for (var b = 0; b < rv.length; b++) {
                var v = rv[b];
                if (u === v || ((mask >> v) & 1) !== 0) continue;
                if (codes[u] !== codes[v]) continue;
                var cand = dp(mask | (1 << u) | (1 << v), u, v);
                if (cand > best) best = cand;
            }
        }
        memo[idx] = best;
        return best;
    }

    // Every palindrome has a center: seed odd paths from each single node
    // and even paths from each equal-label adjacent pair.
    var answer = 1;
    for (var s = 0; s < n; s++) {
        var len1 = dp(1 << s, s, s);
        if (len1 > answer) answer = len1;
    }
    for (var t = 0; t < edges.length; t++) {
        var uu = edges[t][0],
            vv = edges[t][1];
        if (codes[uu] === codes[vv]) {
            var len2 = dp((1 << uu) | (1 << vv), uu, vv);
            if (len2 > answer) answer = len2;
        }
    }
    return answer;
};
