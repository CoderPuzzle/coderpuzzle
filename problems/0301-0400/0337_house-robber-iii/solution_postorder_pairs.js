/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    // Returns [take, skip] for the subtree; pairing the two values
    // means each subtree is evaluated exactly once (post-order).
    function best(node) {
        if (node === null) {
            return [0, 0];
        }
        const [leftTake, leftSkip] = best(node.left);
        const [rightTake, rightSkip] = best(node.right);
        // Taking here forbids both children: use their skip values.
        const takeHere = node.val + leftSkip + rightSkip;
        // Skipping leaves each child free to do its better option.
        const skipHere = Math.max(leftTake, leftSkip) + Math.max(rightTake, rightSkip);
        return [takeHere, skipHere];
    }
    const [takeHere, skipHere] = best(root);
    return Math.max(takeHere, skipHere);
};
