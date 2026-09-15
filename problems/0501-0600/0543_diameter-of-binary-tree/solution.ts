function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;

    function height(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }
        const left = height(node.left);
        const right = height(node.right);
        // The longest path anchored at this node joins its two subtree
        // heights (in edges); the best anchor may bypass the root, so
        // every node contributes a candidate.
        if (left + right > diameter) {
            diameter = left + right;
        }
        // Return the one-sided height — what the parent's candidate
        // needs, deliberately distinct from the two-sided diameter.
        return 1 + Math.max(left, right);
    }

    height(root);
    return diameter;
}
