/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    // In-order traversal of a BST visits values in ascending order, so the
    // kth visit is the kth smallest. k counts down inside the closure; the
    // visit that zeroes it records the answer.
    let answer = -1;
    // Recursion depth is bounded by the tree height h (worst case n on a
    // chain), which is why the iterative twin exists.
    function visit(node) {
        // Early stop: once the answer is recorded, the unvisited remainder
        // of the tree is never touched.
        if (!node || k === 0) return;
        visit(node.left);
        k -= 1;
        if (k === 0) {
            answer = node.val;
            return;
        }
        visit(node.right);
    }
    visit(root);
    return answer;
};
