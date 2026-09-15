/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    // Returns [rob, skip] for the subtree; pairing the two values
    // means each subtree is evaluated exactly once (post-order).
    function best(node) {
        if (node === null) {
            return [0, 0];
        }
        const [leftRob, leftSkip] = best(node.left);
        const [rightRob, rightSkip] = best(node.right);
        // Robbing here forbids both children: take their skip values.
        const robHere = node.val + leftSkip + rightSkip;
        // Skipping leaves each child free to do its better option.
        const skipHere = Math.max(leftRob, leftSkip) + Math.max(rightRob, rightSkip);
        return [robHere, skipHere];
    }
    const [robHere, skipHere] = best(root);
    return Math.max(robHere, skipHere);
};
