/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var boundaryOfBinaryTree = function (root) {
    const isLeaf = (node) => node.left === null && node.right === null;

    // Left boundary: start at the root's left child and keep descending,
    // left child when present and otherwise the right child, stopping
    // before any leaf — the leftmost leaf prints in the leaves alone.
    const boundary = [root.val];
    let node = root.left;
    while (node !== null && !isLeaf(node)) {
        boundary.push(node.val);
        node = node.left !== null ? node.left : node.right;
    }

    // Leaves left to right: an explicit-stack pre-order seeded with the
    // root's children (the root is never a leaf here, and being skipped
    // at the seed it cannot print twice), right child pushed first so
    // pops run left to right. The stack replaces recursion, so a
    // 10^4-deep chain costs no call stack.
    const stack = [];
    if (root.right !== null) {
        stack.push(root.right);
    }
    if (root.left !== null) {
        stack.push(root.left);
    }
    while (stack.length > 0) {
        node = stack.pop();
        if (isLeaf(node)) {
            boundary.push(node.val);
            continue;
        }
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }

    // Right boundary: the mirror walk from the root's right child —
    // right child preferred, stopped before its leaf — collected on the
    // way down and emitted reversed.
    const right = [];
    node = root.right;
    while (node !== null && !isLeaf(node)) {
        right.push(node.val);
        node = node.right !== null ? node.right : node.left;
    }
    for (let i = right.length - 1; i >= 0; i--) {
        boundary.push(right[i]);
    }
    return boundary;
};
