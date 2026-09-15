/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var findDistance = function (root, p, q) {
    // One iterative pass — an explicit stack, never recursion, since a
    // skewed tree runs 10^4 nodes deep — records each value's depth and
    // parent. Values are unique, so a value keys both maps. The distance
    // then resolves through the lowest common ancestor: lift the deeper
    // of p and q to the other's depth, walk both up in lockstep until
    // they meet — that meeting point is the LCA — and return depth[p] +
    // depth[q] - 2 * depth[lca], each leg of the path counted once.
    // p == q needs no special case: the lifts make no move, the walk
    // finds the two already equal, and the formula cancels to 0. The
    // root rides with parent null; no climb ever passes the LCA, which
    // is at the latest the root, so the null is never dereferenced.
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
    let a = p;
    let b = q;
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
    return depthOf.get(p) + depthOf.get(q) - 2 * depthOf.get(a);
};
