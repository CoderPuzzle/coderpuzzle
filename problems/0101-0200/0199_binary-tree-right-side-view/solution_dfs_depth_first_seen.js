/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    // Depth-first with the right child tried first: at every depth the
    // first node popped is the rightmost one there, the node the right
    // edge sees.
    const view = [];
    const stack = [];
    if (root !== null) {
        stack.push({ node: root, depth: 0 });
    }
    while (stack.length > 0) {
        const frame = stack.pop();
        // A depth earns its entry only on that first arrival; every later
        // node popped at the same depth sits further left.
        if (frame.depth === view.length) {
            view.push(frame.node.val);
        }
        // Left pushed before right, so the right child pops first.
        if (frame.node.left !== null) {
            stack.push({ node: frame.node.left, depth: frame.depth + 1 });
        }
        if (frame.node.right !== null) {
            stack.push({ node: frame.node.right, depth: frame.depth + 1 });
        }
    }
    return view;
};
