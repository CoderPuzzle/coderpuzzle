/**
 * @param {TreeNode} root
 * @param {number[]} nodes
 * @return {number}
 */
var lowestCommonAncestor = function (root, nodes) {
    // One iterative pass — an explicit stack, never recursion, since a
    // skewed tree runs 10^4 nodes deep — records each value's depth and
    // parent. Values are unique, so a value keys both maps. The answer
    // then folds pairwise over the query values: hold the running LCA
    // candidate, and for each further value lift the deeper of the two
    // to the other's depth, then walk both up in lockstep until they
    // meet. The LCA is associative — the LCA of the whole list is the
    // LCA of the running candidate and each new value — so the fold
    // lands on the shared ancestor, and a one-value query returns that
    // value untouched. The root rides with parent null; no climb ever
    // passes the LCA, which is at the latest the root, so the null is
    // never dereferenced.
    const depthOf = new Map();
    const parentOf = new Map();
    depthOf.set(root.val, 0);
    parentOf.set(root.val, null);
    const pending = [root];
    while (pending.length > 0) {
        const node = pending.pop();
        const childDepth = depthOf.get(node.val) + 1;
        if (node.left !== null) {
            depthOf.set(node.left.val, childDepth);
            parentOf.set(node.left.val, node.val);
            pending.push(node.left);
        }
        if (node.right !== null) {
            depthOf.set(node.right.val, childDepth);
            parentOf.set(node.right.val, node.val);
            pending.push(node.right);
        }
    }
    let lca = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
        let a = lca;
        let b = nodes[i];
        while (depthOf.get(a) > depthOf.get(b)) {
            a = parentOf.get(a);
        }
        while (depthOf.get(b) > depthOf.get(a)) {
            b = parentOf.get(b);
        }
        while (a !== b) {
            a = parentOf.get(a);
            b = parentOf.get(b);
        }
        lca = a;
    }
    return lca;
};
