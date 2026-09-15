/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    if (root === null) return true;
    // Bottom-up height check: `heights` maps each node to its subtree
    // height, or to -1 once an imbalance is found anywhere inside it.
    const heights = new Map();
    // Explicit post-order stack: a node is settled only after both of its
    // children's heights are known — no recursion, so a 5000-node skewed
    // chain cannot overflow any call stack.
    const stack = [root];
    while (stack.length > 0) {
        const node = stack[stack.length - 1];
        const left = node.left;
        const right = node.right;
        const leftReady = left === null || heights.has(left);
        const rightReady = right === null || heights.has(right);
        if (leftReady && rightReady) {
            stack.pop();
            const leftHeight = left === null ? 0 : heights.get(left);
            const rightHeight = right === null ? 0 : heights.get(right);
            // -1 propagates: a subtree that contains an imbalance can
            // never regain balance higher up, so it fails every ancestor.
            if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
                heights.set(node, -1);
            } else {
                heights.set(node, 1 + Math.max(leftHeight, rightHeight));
            }
        } else {
            if (left !== null && !heights.has(left)) stack.push(left);
            if (right !== null && !heights.has(right)) stack.push(right);
        }
    }
    return heights.get(root) !== -1;
};
