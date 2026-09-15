function minDepth(root: TreeNode | null): number {
    // Loop invariant: `frontier` holds exactly one level's nodes, and every
    // node above them is internal, so the first leaf met in level order
    // sits at the minimum depth.
    if (root === null) return 0;
    let depth = 0;
    let frontier: TreeNode[] = [root];
    while (frontier.length > 0) {
        depth++;
        const next: TreeNode[] = [];
        for (const node of frontier) {
            if (node.left === null && node.right === null) {
                // A leaf at this depth ends the search: BFS never visits
                // below the minimum depth, which is the point.
                return depth;
            }
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        frontier = next;
    }
    return depth;
}
