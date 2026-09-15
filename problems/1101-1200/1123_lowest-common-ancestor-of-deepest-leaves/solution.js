/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function (root) {
    if (root === null) return null;
    // A pre-order stack walk lists parents before children, so the reversed
    // list settles every child's height before its parent reads it.
    const order = [];
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        order.push(node);
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
    }
    const height = new Map(); // node -> deepest leaf depth below it
    for (let i = order.length - 1; i >= 0; --i) {
        const node = order[i];
        let best = -1;
        if (node.left !== null) best = Math.max(best, height.get(node.left));
        if (node.right !== null) best = Math.max(best, height.get(node.right));
        height.set(node, best + 1);
    }
    // Descend toward the taller child; a tie means both sides reach the
    // deepest leaves, so this node is their lowest common ancestor.
    let node = root;
    while (true) {
        const leftH = node.left === null ? -1 : height.get(node.left);
        const rightH = node.right === null ? -1 : height.get(node.right);
        if (leftH > rightH) node = node.left;
        else if (rightH > leftH) node = node.right;
        else return node;
    }
};
