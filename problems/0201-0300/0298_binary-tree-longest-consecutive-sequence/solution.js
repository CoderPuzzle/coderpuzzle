/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestConsecutive = function (root) {
    // For every node, the consecutive run ending there is one longer
    // than its parent's run when the step is exactly +1, and 1 when it
    // is not; the answer is the maximum over all nodes. The traversal
    // carries its own stack: the tree may be a single 3*10^4-node chain,
    // whose run nests 30000 calls — past V8's roughly one-megabyte
    // default call stack.
    let best = 0;
    // Right children parked while the descent walks the left spine,
    // each with the run length already computed for it.
    const pending = [];
    let node = root;
    let length = 1;
    while (node !== null) {
        if (length > best) {
            best = length;
        }
        if (node.right !== null) {
            // Extend into the right child, or restart the run there.
            const step = node.right.val === node.val + 1;
            pending.push([node.right, step ? length + 1 : 1]);
        }
        if (node.left !== null) {
            // Descend left, extending or restarting the same way.
            const step = node.left.val === node.val + 1;
            length = step ? length + 1 : 1;
            node = node.left;
        } else if (pending.length > 0) {
            const [next, run] = pending.pop();
            node = next;
            length = run;
        } else {
            node = null;
        }
    }
    return best;
};
