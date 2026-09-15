function copyRandomBinaryTree(root: RandomTreeNode | null): RandomTreeNode | null {
    const clones = new Map<RandomTreeNode, RandomTreeNode>();
    const clone = (node: RandomTreeNode | null): RandomTreeNode | null => {
        if (node === null) return null;
        const existing = clones.get(node);
        if (existing !== undefined) return existing;
        const copy = new RandomTreeNode(node.val);
        clones.set(node, copy);
        copy.left = clone(node.left);
        copy.right = clone(node.right);
        copy.random = clone(node.random);
        return copy;
    };
    return clone(root);
}
