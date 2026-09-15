function maxSumBST(root: TreeNode | null): number {
    let best = 0;
    // returns null if not a BST, else [min, max, sum]
    // (empty subtree -> [Infinity, -Infinity, 0])
    const dfs = (node: TreeNode | null): number[] | null => {
        if (node === null) {
            return [Infinity, -Infinity, 0];
        }
        const left = dfs(node.left);
        const right = dfs(node.right);
        if (left === null || right === null) {
            return null;
        }
        const v = node.val;
        if (left[1] >= v || right[0] <= v) {
            return null;
        }
        const sum = left[2] + right[2] + v;
        if (sum > best) {
            best = sum;
        }
        return [Math.min(left[0], v), Math.max(right[1], v), sum];
    };
    dfs(root);
    return best;
}
