function maxLevelSum(root: TreeNode | null): number {
    let frontier: TreeNode[] = [root as TreeNode];
    let bestLevel = 1;
    let bestSum = (root as TreeNode).val;
    let level = 1;
    while (frontier.length > 0) {
        let total = 0;
        for (const node of frontier) total += node.val;
        // Strict > keeps the SMALLEST level on ties.
        if (total > bestSum) {
            bestSum = total;
            bestLevel = level;
        }
        const next: TreeNode[] = [];
        for (const node of frontier) {
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        frontier = next;
        level++;
    }
    return bestLevel;
}
