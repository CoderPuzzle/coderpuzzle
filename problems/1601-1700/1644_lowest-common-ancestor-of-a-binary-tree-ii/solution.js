/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    // Iterative pre-order build of a value -> parent-value map (and a
    // value -> node lookup) in one pass. Node values are unique, so a
    // value serves as a stable, hashable key everywhere. Once built, p
    // and q's presence is a plain membership check against nodeOf — this
    // is the existence check, done for free by the same walk that will
    // drive the LCA search.
    if (root === null) {
        return null;
    }
    const nodeOf = new Map();
    const parentOf = new Map();
    parentOf.set(root.val, null);
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        nodeOf.set(node.val, node);
        if (node.left !== null) {
            parentOf.set(node.left.val, node.val);
            stack.push(node.left);
        }
        if (node.right !== null) {
            parentOf.set(node.right.val, node.val);
            stack.push(node.right);
        }
    }
    if (!nodeOf.has(p) || !nodeOf.has(q)) {
        return null;
    }
    // Walk p up to the root, collecting every value on that path.
    const ancestors = new Set();
    let val = p;
    while (val !== null) {
        ancestors.add(val);
        val = parentOf.get(val);
    }
    // Walk q up until it lands on a value already seen from p; that is
    // the lowest shared ancestor (this also handles p == q and either
    // one already being the other's ancestor, since the starting value
    // is checked before climbing).
    val = q;
    while (!ancestors.has(val)) {
        val = parentOf.get(val);
    }
    return nodeOf.get(val);
};
