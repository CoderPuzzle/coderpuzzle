function encode(root: Node | null): TreeNode | null {
    if (root === null) return null;
    const broot: TreeNode = new TreeNode(root.val);
    const nodes: Node[] = [root];
    const binaries: TreeNode[] = [broot];
    for (let qi = 0; qi < nodes.length; qi++) {
        const node = nodes[qi];
        const bnode = binaries[qi];
        let prev: TreeNode | null = null;
        for (const child of node.children) {
            const bchild: TreeNode = new TreeNode(child.val);
            if (prev === null) {
                bnode.left = bchild;
            } else {
                prev.right = bchild;
            }
            prev = bchild;
            nodes.push(child);
            binaries.push(bchild);
        }
    }
    return broot;
}
