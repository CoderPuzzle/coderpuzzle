/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
    // An inorder walk of a BST visits the values in ascending order, so the
    // closest pair in the whole tree appears as two consecutive visits —
    // any two values with a third between them sit farther apart than that
    // third sits from one of them. The walk keeps only the previously
    // visited value and folds in the smallest difference to the current one.
    let best = Infinity;
    let prev = -1;
    // The stack, not the call stack, drives the descent to each leftmost
    // node and the step back up — the tree may legally be a single
    // 100-node chain.
    const stack = [];
    let node = root;
    while (node !== null || stack.length > 0) {
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        // Values are never negative, so prev < 0 marks the very first
        // visit; at least two nodes exist, so best is always set.
        if (prev >= 0) {
            best = Math.min(best, node.val - prev);
        }
        prev = node.val;
        node = node.right;
    }
    return best;
};
