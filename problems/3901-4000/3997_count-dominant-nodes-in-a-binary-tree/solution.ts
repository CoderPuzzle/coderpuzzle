function countDominantNodes(root: TreeNode | null): number {
    function go(n: TreeNode | null): number[] {
        if (!n) return [-1, 0];
        const [a, x] = go(n.left),
            [b, y] = go(n.right),
            m = Math.max(n.val, a, b);
        return [m, x + y + Number(n.val === m)];
    }
    return go(root)[1];
}
