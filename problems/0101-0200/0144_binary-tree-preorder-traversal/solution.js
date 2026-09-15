/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    const result = [];
    if (root === null) return result;
    const stack = [root];
    // Loop invariant: `stack` holds exactly the discovered-but-unvisited
    // nodes, in the order preorder wants them next.
    while (stack.length > 0) {
        const node = stack.pop();
        // Preorder visits a node before either of its subtrees.
        result.push(node.val);
        // Push right before left: the stack pops from the top, so the left
        // child (and its entire subtree) is traversed first.
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
    }
    return result;
};
