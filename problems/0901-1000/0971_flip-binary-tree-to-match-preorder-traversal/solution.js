/**
 * @param {TreeNode} root
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
    // The walk and the voyage run in lockstep: a preorder descent that
    // consumes one voyage value per node and, whenever the next value
    // names the right child rather than the left, flips the current
    // node and records it. Values are unique, so each flip decision is
    // forced — the recorded set is the smallest one, listed in the
    // order the resulting preorder meets the flipped nodes. Any
    // disagreement, or voyage entries left over, means no flip set
    // works: [-1].
    const flips = [];
    const pending = [];
    if (root !== null) {
        pending.push(root);
    }
    let cursor = 0;
    while (pending.length > 0) {
        const node = pending.pop();
        if (cursor === voyage.length || voyage[cursor] !== node.val) {
            return [-1];
        }
        cursor++;
        let left = node.left;
        let right = node.right;
        if (left !== null && (cursor === voyage.length || voyage[cursor] !== left.val)) {
            flips.push(node.val);
            const swap = left;
            left = right;
            right = swap;
        }
        if (right !== null) pending.push(right);
        if (left !== null) pending.push(left);
    }
    if (cursor !== voyage.length) {
        return [-1];
    }
    return flips;
};
