/**
 * @param {TreeNode} root
 * @return {number}
 */
var countUnivalSubtrees = function (root) {
    let count = 0;
    // Post-order: each call reports whether the subtree rooted at `node` is
    // uni-value; every true is one more subtree for the count.
    function isUnival(node) {
        // The empty tree is vacuously uni-value: an absent child never breaks
        // its parent. It is never counted, so root === null yields 0.
        if (node === null) {
            return true;
        }
        // Visit both children unconditionally: counting happens inside the
        // recursion, and a skipped branch would skip its own subtrees.
        const left = isUnival(node.left);
        const right = isUnival(node.right);
        const uni =
            left &&
            right &&
            (node.left === null || node.left.val === node.val) &&
            (node.right === null || node.right.val === node.val);
        if (uni) {
            count++;
        }
        return uni;
    }
    isUnival(root);
    return count;
};
