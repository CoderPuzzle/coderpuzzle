/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var flatten = function (root) {
    let node = root;
    // Loop invariant: every node already passed hangs on a single right
    // spine — the flattened pre-order prefix, all left pointers null — so
    // `node` is always the next pre-order node awaiting its splice.
    while (node !== null) {
        if (node.left !== null) {
            // The rightmost node of the left subtree ends that subtree's
            // pre-order, so it is the last node visited before the old right
            // subtree: let it adopt that subtree, then swing the whole left
            // subtree across to the right.
            let tail = node.left;
            while (tail.right !== null) {
                tail = tail.right;
            }
            tail.right = node.right;
            node.right = node.left;
            node.left = null;
        }
        node = node.right;
    }
    return root;
};
