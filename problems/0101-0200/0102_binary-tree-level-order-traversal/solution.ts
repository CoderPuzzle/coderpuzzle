function levelOrder(root: TreeNode | null): number[][] {
    // Handle the empty tree up front, before the queue exists.
    if (root === null) {
        return [];
    }
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    // Loop invariant: at the top of each round the queue holds exactly
    // one level's nodes and nothing else.
    while (queue.length > 0) {
        // Snapshot the size now: children enqueued below belong to the
        // NEXT level, so draining exactly `size` nodes keeps levels
        // separated without any sentinel markers.
        const size = queue.length;
        const level: number[] = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!;
            level.push(node.val);
            // Skipping null children on enqueue keeps the invariant;
            // left-then-right order preserves reading order.
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        result.push(level);
    }
    return result;
}
