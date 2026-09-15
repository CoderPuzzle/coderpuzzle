/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
    let best = 0;
    // Depth -> [leftmost, rightmost] frame positions seen at that depth
    // — the two running extremes; the null slots between the end nodes
    // are counted by the arithmetic, never materialized.
    const extremes = new Map();
    // An array used as a stack. Popping the last entry, and pushing the
    // right child before the left, walks the tree root-first, left
    // subtree before right — preorder, which visits every depth in index
    // order.
    const stack = [];
    if (root !== null) {
        stack.push([root, 0, 0]);
    }
    while (stack.length > 0) {
        const entry = stack.pop();
        const node = entry[0];
        const depth = entry[1];
        const pos = entry[2];
        let span = extremes.get(depth);
        if (span === undefined) span = [pos, pos];
        if (pos < span[0]) span[0] = pos;
        if (pos > span[1]) span[1] = pos;
        extremes.set(depth, span);
        const width = span[1] - span[0] + 1;
        if (width > best) {
            best = width;
        }
        // Re-base before doubling: raw heap indices double per level
        // and blow past 64 bits on a deep chain. Shifted so the level
        // starts at its leftmost node, a stored index never exceeds
        // twice the level's width; a width is a difference within one
        // level, and the shift leaves every such difference unchanged.
        const rebased = pos - span[0];
        if (node.right !== null) stack.push([node.right, depth + 1, 2 * rebased + 1]);
        if (node.left !== null) stack.push([node.left, depth + 1, 2 * rebased]);
    }
    return best;
};
