function averageOfLevels(root: TreeNode | null): number[] {
    const averages: number[] = [];
    const queue: TreeNode[] = [];
    if (root !== null) {
        queue.push(root);
    }
    while (queue.length > 0) {
        // One round drains exactly one level: the nodes sitting in the
        // queue when the round starts. Children appended during the round
        // belong to the next level, and the count is fixed up front. Every
        // partial sum stays below 2^53 (10^4 values of magnitude 2^31), so
        // the additions are exact integer arithmetic and the only rounding
        // anywhere is the single division that closes the round.
        let total = 0;
        const remaining = queue.length;
        for (let i = 0; i < remaining; ++i) {
            const node = queue.shift()!;
            total += node.val;
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        averages.push(total / remaining);
    }
    return averages;
}
