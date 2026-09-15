/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var lowestCommonAncestor = function (root, p, q) {
    // Plain descent, no stack or parent pointers: two comparisons per
    // level decide which side both targets lie on.
    let node = root;
    while (node) {
        if (p < node.val && q < node.val) {
            node = node.left;
        } else if (p > node.val && q > node.val) {
            node = node.right;
        } else {
            // First node where the targets split sides (or equals one of
            // them): every strict ancestor keeps both in one subtree.
            return node.val;
        }
    }
    return -1;
};
