/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    // Explicit post-order: frames of (node, phase) replace the call stack.
    // Phase 0 = first visit (descend left), 1 = left done (descend right),
    // 2 = both done (combine). Finished single-side gains pile on their own
    // stack, the children's results waiting for the parent.
    const stack = [];
    const gains = [];
    // A path must contain at least one node, so start at -inf, not 0.
    let best = -Infinity;
    if (root !== null && root !== undefined) {
        stack.push({ node: root, phase: 0 });
    }
    while (stack.length > 0) {
        const frame = stack.pop();
        const node = frame.node;
        if (frame.phase === 0) {
            // Reschedule as phase 1, then let the left subtree run first by
            // sitting on top of the stack.
            stack.push({ node, phase: 1 });
            if (node.left !== null && node.left !== undefined) {
                stack.push({ node: node.left, phase: 0 });
            }
        } else if (frame.phase === 1) {
            stack.push({ node, phase: 2 });
            if (node.right !== null && node.right !== undefined) {
                stack.push({ node: node.right, phase: 0 });
            }
        } else {
            // Both subtrees finished: right's gain sits above left's on the
            // gain stack (left ran first). Missing children left nothing
            // to pop, hence the undefined cases.
            const rightGain = node.right != null ? gains.pop() : undefined;
            const leftGain = node.left != null ? gains.pop() : undefined;
            // Clamp each side at 0: a negative branch is better left unvisited.
            const downLeft = Math.max(leftGain !== undefined ? leftGain : 0, 0);
            const downRight = Math.max(rightGain !== undefined ? rightGain : 0, 0);
            // The path bending through this node is a candidate for the
            // global answer.
            best = Math.max(best, node.val + downLeft + downRight);
            // The parent may only extend the path through one side.
            gains.push(node.val + Math.max(downLeft, downRight));
        }
    }
    return best;
};
