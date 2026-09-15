/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var findClosestLeaf = function (root, k) {
    // Distance here runs over the tree's edges as an undirected graph: the
    // nearest leaf may sit in another subtree, up through parents and across
    // the root, so a descending search alone cannot prove a leaf nearest.
    // One breadth-first pass from the root records each node's parent and
    // collects every node, which also locates k.
    const parents = new Map();
    const order = [];
    if (root !== null) {
        order.push(root);
    }
    for (let head = 0; head < order.length; head++) {
        const node = order[head];
        if (node.left !== null) {
            parents.set(node.left, node);
            order.push(node.left);
        }
        if (node.right !== null) {
            parents.set(node.right, node);
            order.push(node.right);
        }
    }
    const target = order.find((node) => node.val === k);

    // A level-synchronized walk from the k node spreads one edge per step
    // through parent, left child, and right child. The first level holding
    // a leaf holds every nearest leaf; the smallest value among them
    // settles the tie rule.
    let frontier = [target];
    const seen = new Set([target]);
    while (frontier.length > 0) {
        let best = null;
        for (const node of frontier) {
            if (node.left === null && node.right === null && (best === null || node.val < best)) {
                best = node.val;
            }
        }
        if (best !== null) {
            return best;
        }
        const reached = [];
        for (const node of frontier) {
            const parent = parents.get(node);
            if (parent !== undefined && !seen.has(parent)) {
                seen.add(parent);
                reached.push(parent);
            }
            for (const child of [node.left, node.right]) {
                if (child !== null && !seen.has(child)) {
                    seen.add(child);
                    reached.push(child);
                }
            }
        }
        frontier = reached;
    }
    throw new Error("unreachable: every tree has a leaf");
};
