/**
 * @param {number[]} parents
 * @param {number[][]} queries
 * @return {number[]}
 */
var maxGeneticDifference = function (parents, queries) {
    var BITS = 18;
    var n = parents.length;
    var children = new Array(n);
    for (var i0 = 0; i0 < n; i0++) children[i0] = [];
    var root = -1;
    for (var i = 0; i < n; i++) {
        if (parents[i] === -1) root = i;
        else children[parents[i]].push(i);
    }

    var byNode = new Array(n);
    for (var b0 = 0; b0 < n; b0++) byNode[b0] = [];
    for (var idx = 0; idx < queries.length; idx++) {
        byNode[queries[idx][0]].push([queries[idx][1], idx]);
    }

    var ans = new Array(queries.length).fill(0);

    // trie stored as flat lists: children[bit] indices and subtree counts
    var nxt = [[0, 0]];
    var count = [0];

    function insert(x, delta) {
        var node = 0;
        count[node] += delta;
        for (var b = BITS - 1; b >= 0; b--) {
            var bit = (x >> b) & 1;
            if (nxt[node][bit] === 0) {
                nxt[node][bit] = nxt.length;
                nxt.push([0, 0]);
                count.push(0);
            }
            node = nxt[node][bit];
            count[node] += delta;
        }
    }

    function queryMax(x) {
        var node = 0;
        var res = 0;
        for (var b = BITS - 1; b >= 0; b--) {
            var bit = (x >> b) & 1;
            var want = 1 - bit;
            var cand = nxt[node][want];
            if (cand !== 0 && count[cand] > 0) {
                res |= 1 << b;
                node = cand;
            } else {
                node = nxt[node][bit];
            }
        }
        return res;
    }

    var stack = [[root, false]];
    while (stack.length > 0) {
        var top = stack.pop();
        var u = top[0],
            exiting = top[1];
        if (exiting) {
            insert(u, -1);
            continue;
        }
        stack.push([u, true]);
        insert(u, 1);
        var bq = byNode[u];
        for (var q = 0; q < bq.length; q++) {
            ans[bq[q][1]] = queryMax(bq[q][0]);
        }
        var cu = children[u];
        for (var c = 0; c < cu.length; c++) {
            stack.push([cu[c], false]);
        }
    }

    return ans;
};
