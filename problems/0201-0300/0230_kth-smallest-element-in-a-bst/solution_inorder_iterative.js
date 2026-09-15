/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    // In-order traversal of a BST visits values in ascending order, so the
    // kth visit is the kth smallest. The explicit stack simulates the
    // recursion, keeping space proportional to the tree height.
    const stack = [];
    let node = root;
    while (node || stack.length) {
        // Push and descend the left spine as far as possible.
        while (node) {
            stack.push(node);
            node = node.left;
        }
        // Left spine exhausted: popping is the "visit".
        node = stack.pop();
        k -= 1;
        // Early stop: the unvisited remainder is never touched.
        if (k === 0) {
            return node.val;
        }
        node = node.right;
    }
    return -1;
};
