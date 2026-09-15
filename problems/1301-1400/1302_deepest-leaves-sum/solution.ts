function deepestLeavesSum(root: TreeNode | null): number {
    // Level-order sweep: levelSum is overwritten at every level, so when the
    // queue finally empties it holds exactly the deepest leaves' sum.
    if (root === null) {
        return 0;
    }
    let queue: TreeNode[] = [root];
    let levelSum = 0;
    while (queue.length > 0) {
        levelSum = 0;
        const next: TreeNode[] = [];
        for (const node of queue) {
            levelSum += node.val;
            if (node.left !== null) {
                next.push(node.left);
            }
            if (node.right !== null) {
                next.push(node.right);
            }
        }
        queue = next;
    }
    return levelSum;
}
