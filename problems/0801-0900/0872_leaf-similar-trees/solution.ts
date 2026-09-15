function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    // Two trees are leaf-similar exactly when their leaf value sequences
    // agree, so the whole question is writing each sequence down and
    // comparing them.
    function leafValues(root: TreeNode | null): number[] {
        // The walk carries an explicit stack: pop a node, record its
        // value when both children are missing — that node is a leaf —
        // otherwise push the right child and then the left, so the left
        // subtree is always the next to pop and the values come out in
        // left-to-right order. Only leaves are recorded, so internal
        // values and the shapes above the leaves never enter the
        // comparison; an exhausted stack means the sequence is complete.
        const values: number[] = [];
        const pending: Array<TreeNode | null> = [root];
        while (pending.length > 0) {
            const node = pending.pop()!;
            if (node === null) continue;
            if (node.left === null && node.right === null) {
                values.push(node.val);
                continue;
            }
            if (node.right !== null) pending.push(node.right);
            if (node.left !== null) pending.push(node.left);
        }
        return values;
    }

    const a = leafValues(root1);
    const b = leafValues(root2);
    if (a.length !== b.length) return false;
    return a.every((value, index) => value === b[index]);
}
