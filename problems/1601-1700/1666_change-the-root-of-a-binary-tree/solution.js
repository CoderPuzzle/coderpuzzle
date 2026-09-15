/**
 * @param {TreeNode} root
 * @param {number} leaf
 * @return {TreeNode}
 */
var flipBinaryTree = function (root, leaf) {
    // Rerooting is a walk, not a rebuild: the rule names, for every node
    // on the leaf-to-root path, exactly which pointers move. One descent
    // first records each node's parent, keyed by value (values are
    // unique, so the first node met with the leaf's value is the leaf
    // itself) — the parent pointers the statement demands, kept in the
    // solver's own map.
    const parent = new Map();
    parent.set(root.val, null);
    let target = null;
    const pending = [root];
    while (pending.length > 0) {
        const node = pending.pop();
        if (node.val === leaf) {
            target = node;
        }
        for (const child of [node.right, node.left]) {
            if (child !== null) {
                parent.set(child.val, node);
                pending.push(child);
            }
        }
    }
    // Then the two steps are applied bottom-up, stopping before the root:
    // clear the parent's downward pointer (emptying the slot the moved
    // subtree needs), move a surviving left child across to the right,
    // and attach the parent as the new left child. The leaf the walk
    // started from is the new root.
    let cur = target;
    while (parent.get(cur.val) !== null) {
        const above = parent.get(cur.val);
        if (above.left === cur) {
            above.left = null;
        } else if (above.right === cur) {
            above.right = null;
        }
        if (cur.left !== null) {
            cur.right = cur.left;
        }
        cur.left = above;
        cur = above;
    }
    return target;
};
