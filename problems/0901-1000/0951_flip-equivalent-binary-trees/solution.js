/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function (root1, root2) {
    // Flip equivalence is a question of pairing: some way of walking the
    // trees together, committing at each paired node to the straight or
    // the swapped alignment of children, must run out of nodes without a
    // disagreement. The stack carries the pairs.
    function aligned(a, b) {
        if (a === null || b === null) return a === b;
        return a.val === b.val;
    }

    const pending = [[root1, root2]];
    while (pending.length > 0) {
        const [a, b] = pending.pop();
        if (a === null && b === null) continue;
        if (a === null || b === null || a.val !== b.val) return false;
        if (aligned(a.left, b.left) && aligned(a.right, b.right)) {
            pending.push([a.left, b.left], [a.right, b.right]);
        } else if (aligned(a.left, b.right) && aligned(a.right, b.left)) {
            pending.push([a.left, b.right], [a.right, b.left]);
        } else {
            return false;
        }
    }
    return true;
};
