/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var lowestCommonAncestor = function (root, p, q) {
    // One walk over the tree records every node's parent. Values are
    // unique, so a value identifies its node; the root records none.
    const parent = new Map();
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        for (const child of [node.left, node.right]) {
            if (child !== null) {
                parent.set(child.val, node.val);
                stack.push(child);
            }
        }
    }
    // Every node on the root-to-p chain, p and root included, is a shared
    // ancestor candidate: it is an ancestor of p by construction.
    const ancestors = new Set();
    let value = p;
    while (true) {
        ancestors.add(value);
        if (value === root.val) break;
        value = parent.get(value);
    }
    // Climb from q: the first candidate met is the deepest node whose
    // subtree covers both targets.
    value = q;
    while (!ancestors.has(value)) {
        value = parent.get(value);
    }
    return value;
};
