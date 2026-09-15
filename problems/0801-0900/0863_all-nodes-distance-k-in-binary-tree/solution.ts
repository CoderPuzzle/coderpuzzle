function distanceK(root: TreeNode | null, target: number, k: number): number[] {
    // Distance k counts edges on paths that may climb through parents as
    // well as descend through children, so the answer can spill out of the
    // target's own subtree — a downward search alone cannot reach it. One
    // breadth-first pass from the root records each node's parent and
    // collects every node, which also locates the node carrying the target
    // value.
    const parents = new Map<TreeNode, TreeNode>();
    const order: TreeNode[] = [];
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
    const start = order.find((node) => node.val === target)!;

    // A level-synchronized walk from the target spreads one edge per step
    // through parent, left child, and right child, never revisiting a node,
    // so after k steps the frontier holds exactly the nodes at distance k.
    // Sorting the collected values settles the ascending output order the
    // statement pins.
    let frontier: TreeNode[] = [start];
    const seen = new Set<TreeNode>([start]);
    for (let step = 0; step < k; step++) {
        const reached: TreeNode[] = [];
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
        if (frontier.length === 0) {
            break;
        }
    }
    const result = frontier.map((node) => node.val);
    result.sort((a, b) => a - b);
    return result;
}
