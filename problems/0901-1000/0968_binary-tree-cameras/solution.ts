function minCameraCover(root: TreeNode | null): number {
    let cameras = 0;

    function dfs(node: TreeNode | null): number {
        // States: 0 = uncovered, 1 = has a camera, 2 = covered.
        if (node === null) {
            // Null reports covered so leaves start uncovered and push
            // the first camera one level up.
            return 2;
        }
        const left = dfs(node.left);
        const right = dfs(node.right);
        if (left === 0 || right === 0) {
            // An uncovered child forces a camera here — the parent of
            // an uncovered node is always the best placement.
            cameras += 1;
            return 1;
        }
        if (left === 1 || right === 1) {
            return 2;
        }
        return 0;
    }

    if (dfs(root) === 0) {
        cameras += 1;
    }
    return cameras;
}
