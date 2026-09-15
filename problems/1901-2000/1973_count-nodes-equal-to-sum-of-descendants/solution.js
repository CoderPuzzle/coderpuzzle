/**
 * A reverse preorder walk visits children before parents, so processing
 * the collected nodes back-to-front lets each node's subtree sum be built
 * from its children's already-computed sums. A node counts when its value
 * equals the sum of its descendants, i.e. its subtree sum minus its own
 * value. The traversal is fully iterative, so a 10^5-deep skewed tree
 * cannot overflow any stack. Subtree sums reach 10^5 * 10^5 = 10^10, so
 * they are kept in 64-bit space (a plain Number is exact below 2^53).
 * @param {TreeNode} root
 * @return {number}
 */
var equalToDescendants = function (root) {
    const order = [];
    const pending = [root];
    while (pending.length > 0) {
        const node = pending.pop();
        order.push(node);
        if (node.right !== null) pending.push(node.right);
        if (node.left !== null) pending.push(node.left);
    }
    const subtree = new Map();
    let count = 0;
    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];
        const total = node.val + (subtree.get(node.left) || 0) + (subtree.get(node.right) || 0);
        subtree.set(node, total);
        if (node.val === total - node.val) count++;
    }
    return count;
};
