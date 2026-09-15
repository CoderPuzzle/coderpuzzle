/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    // counter maps root-to-node prefix sums seen on the current path to
    // their counts; [0, 1] counts paths starting at a node itself.
    const counter = new Map([[0, 1]]);

    const dfs = (node, running) => {
        if (node === null) {
            return 0;
        }
        running += node.val;
        // A path ending here with the target starts at an ancestor whose
        // prefix equals running - targetSum (prefix(v) - prefix(u) trick).
        let total = counter.get(running - targetSum) || 0;
        // Register this prefix only after the lookup, then recurse.
        counter.set(running, (counter.get(running) || 0) + 1);
        total += dfs(node.left, running);
        total += dfs(node.right, running);
        // Undo on backtrack: left-subtree prefixes must not pair with
        // right-subtree nodes, so lookups see true ancestors only.
        counter.set(running, counter.get(running) - 1);
        return total;
    };

    return dfs(root, 0);
};
