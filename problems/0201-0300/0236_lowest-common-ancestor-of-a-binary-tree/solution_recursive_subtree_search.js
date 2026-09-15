/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var lowestCommonAncestor = function (root, p, q) {
    // find answers a narrower question per subtree: does it hold p or q?
    // It returns the found target node itself, or null if neither is there.
    function find(node) {
        // A node counts as a descendant of itself, so a value match is
        // itself a successful find and we return immediately.
        if (node === null || node.val === p || node.val === q) {
            return node;
        }
        const left = find(node.left);
        const right = find(node.right);
        // Each side found a target: they meet at this node for the first
        // time — everything below saw at most one — so this is the answer.
        if (left !== null && right !== null) {
            return node;
        }
        // Otherwise propagate the lone non-null sighting upward.
        return left !== null ? left : right;
    }
    return find(root).val;
};
