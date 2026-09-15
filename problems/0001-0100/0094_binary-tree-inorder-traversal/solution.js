/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let node = root;
    // Loop invariant: `stack` holds the ancestors whose left subtrees are
    // still being descended into; `node` is the next subtree to process
    // (null means it is time to pop back up instead).
    while (node !== null || stack.length > 0) {
        // Descend the left spine, remembering every node on it.
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
        // The stack top is now the leftmost unvisited node of the current
        // subtree — the next value in inorder order.
        node = stack.pop();
        result.push(node.val);
        // The popped node's left subtree is done; traverse its right
        // subtree in full before any ancestor below it is visited.
        node = node.right;
    }
    return result;
};
