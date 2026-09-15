/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var bstToGst = function (root) {
    // Running sum of every value the reverse in-order has visited.
    let total = 0;

    function reverseInorder(current) {
        if (current === null) {
            return;
        }
        // Right subtree first: reversed in-order walks keys largest to smallest.
        reverseInorder(current.right);
        // On arrival every strictly greater key is already in `total`, so
        // the overwrite yields this key plus the sum of all greater keys.
        total += current.val;
        current.val = total;
        // Left subtree sees the accumulated total of all larger values.
        reverseInorder(current.left);
    }

    reverseInorder(root);
    return root;
};
