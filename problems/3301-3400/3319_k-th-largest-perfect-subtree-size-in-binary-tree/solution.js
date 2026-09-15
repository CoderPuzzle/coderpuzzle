/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestPerfectSubtree = function (root, k) {
    // One BFS pass records the nodes; walking that array backwards visits
    // children before parents, so sizes propagate bottom-up with no
    // recursion — a chain can run 2000 nodes deep. info.get(node) is the
    // subtree size when the subtree is perfect, else 0: a perfect
    // internal node needs both children perfect with equal sizes, and a
    // leaf is perfect with size 1.
    const order = [root];
    for (let i = 0; i < order.length; ++i) {
        if (order[i].left) order.push(order[i].left);
        if (order[i].right) order.push(order[i].right);
    }
    const info = new Map();
    const sizes = [];
    for (let i = order.length - 1; i >= 0; --i) {
        const node = order[i];
        if (!node.left && !node.right) {
            info.set(node, 1);
        } else if (node.left && node.right) {
            const left = info.get(node.left);
            const right = info.get(node.right);
            info.set(node, left > 0 && left === right ? 1 + left + right : 0);
        } else {
            info.set(node, 0);
        }
        if (info.get(node) > 0) sizes.push(info.get(node));
    }
    sizes.sort((a, b) => b - a);
    return k <= sizes.length ? sizes[k - 1] : -1;
};
