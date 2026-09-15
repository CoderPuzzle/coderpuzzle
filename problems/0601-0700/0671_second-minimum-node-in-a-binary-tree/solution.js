/**
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
    // The min property makes root.val the minimum of the whole tree: a
    // parent is the smaller of its children, so every value below the
    // root is >= the root's own. The second minimum is therefore the
    // smallest value strictly greater than root.val. The walk descends
    // only through nodes that still carry the root's value — a node with
    // a larger value is itself the best its whole subtree can offer
    // (everything beneath it is at least as large), so it is taken as a
    // candidate and its subtree is pruned. best starts at -1, which no
    // node value can equal (values are >= 1), so it doubles as the
    // fallback answer.
    const rootValue = root.val;
    let best = -1;
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        if (node.val === rootValue) {
            // 0 or 2 children: one null check settles both pushes.
            if (node.left !== null) {
                stack.push(node.left, node.right);
            }
        } else if (best === -1 || node.val < best) {
            best = node.val;
        }
    }
    return best;
};
