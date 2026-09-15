/**
 * @param {TreeNode} root
 * @return {number}
 */
var maximumAverageSubtree = function (root) {
    // Pre-order listing: each descendant appears after its ancestor, so the
    // reversed list settles both subtrees before the node above them.
    const order = [];
    const stack = root === null ? [] : [root];
    while (stack.length > 0) {
        const node = stack.pop();
        order.push(node);
        // Push right first so left is visited first in the listing.
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
    }
    const aggregate = new Map(); // node -> [sum, size]
    let best = 0.0;
    for (let i = order.length - 1; i >= 0; --i) {
        const node = order[i];
        let total = node.val;
        let size = 1;
        for (const child of [node.left, node.right]) {
            if (child !== null) {
                const pair = aggregate.get(child);
                total += pair[0];
                size += pair[1];
            }
        }
        aggregate.set(node, [total, size]);
        const average = total / size;
        if (average > best) best = average;
    }
    return best;
};
