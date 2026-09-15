function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (root === null) return result;
    let queue: TreeNode[] = [root];
    // Loop invariant: `queue` holds exactly one level's nodes, left to
    // right; `leftToRight` says which way that level is emitted.
    let leftToRight = true;
    while (queue.length > 0) {
        const level: number[] = queue.map((node) => node.val);
        if (!leftToRight) {
            // Collected left to right, so reversing yields right to left.
            level.reverse();
        }
        result.push(level);
        // Spread the next level: children enter left child first, which
        // keeps the queue ordered left to right for the round to come.
        queue = queue.flatMap((node) => [node.left, node.right].filter((child) => child !== null));
        leftToRight = !leftToRight;
    }
    return result;
}
