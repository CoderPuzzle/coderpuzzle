/**
 * @param {number[][]} edges
 * @return {number}
 */
var maxScore = function (edges) {
    const n = edges.length;
    if (n === 1) return 0;
    const children = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; i++) {
        children[edges[i][0]].push(i);
    }
    // Iterative preorder; iterating it in reverse finalizes every child
    // before its parent, so no recursion (n can be 1e5, deep chains).
    const order = [];
    const stack = [0];
    while (stack.length) {
        const u = stack.pop();
        order.push(u);
        for (const c of children[u]) stack.push(c);
    }
    // dp0[u]: parent edge not chosen; dp1[u]: chosen (its weight is
    // accounted by the parent, so dp1 only constrains u's own picks).
    const dp0 = new Array(n).fill(0);
    const dp1 = new Array(n).fill(0);
    for (let oi = order.length - 1; oi >= 0; oi--) {
        const u = order[oi];
        // base = take no child edge: sum of children in state 0.
        let base = 0;
        let bestGain = 0;
        for (const c of children[u]) {
            const w = edges[c][1];
            base += dp0[c];
            // Switching c's edge on: child must drop its parent edge.
            const gain = dp1[c] + w - dp0[c];
            if (gain > bestGain) bestGain = gain;
        }
        // u may take at most one child edge; only a positive gain is
        // applied, so negative-weight edges are never forced in.
        dp0[u] = base + bestGain;
        // Parent edge taken => no child edge allowed for u.
        dp1[u] = base;
    }
    return dp0[0];
};
