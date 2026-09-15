/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    const result = [];
    if (root === null) {
        return result;
    }
    const stack = [root];
    // Loop invariant: `stack` holds nodes still to be expanded; each is
    // emitted the moment it is popped. Children are pushed left first, so
    // the right child is always expanded before the left one.
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        // Left first, right on top: the emits so far read root, right, left
        // — preorder with the two children swapped.
        if (node.left !== null) {
            stack.push(node.left);
        }
        if (node.right !== null) {
            stack.push(node.right);
        }
    }
    // Root-right-left read backwards is left-right-root: postorder.
    result.reverse();
    return result;
};
