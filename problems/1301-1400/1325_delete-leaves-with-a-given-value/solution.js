/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {TreeNode}
 */
var removeLeafNodes = function (root, target) {
    // Post-order prune with an explicit stack (a 3000-node chain would
    // overflow any recursion budget): children are judged before the node
    // itself, so the whole cascade collapses in one pass.
    if (root === null) return null;
    // [node, parent, side, expanded] — side 0 = left, 1 = right.
    const stack = [[root, null, 0, false]];
    while (stack.length > 0) {
        const [node, parent, side, expanded] = stack.pop();
        if (!expanded) {
            stack.push([node, parent, side, true]);
            if (node.left !== null) stack.push([node.left, node, 0, false]);
            if (node.right !== null) stack.push([node.right, node, 1, false]);
            continue;
        }
        if (node.left === null && node.right === null && node.val === target) {
            if (parent === null) return null;
            if (side === 0) parent.left = null;
            else parent.right = null;
        }
    }
    return root;
};
