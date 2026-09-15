function treeToDoublyList(root: TreeNode | null): NodeWithNext | null {
    const values: number[] = [];
    const stack: TreeNode[] = [];
    let node: TreeNode | null = root;
    while (stack.length > 0 || node !== null) {
        while (node !== null) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop()!;
        values.push(node.val);
        node = node.right;
    }
    const nodes = values.map((value) => new NodeWithNext(value));
    for (let index = 0; index + 1 < nodes.length; index++) {
        nodes[index].right = nodes[index + 1];
        nodes[index + 1].left = nodes[index];
    }
    if (nodes.length > 0) {
        nodes[nodes.length - 1].right = nodes[0];
        nodes[0].left = nodes[nodes.length - 1];
        return nodes[0];
    }
    return null;
}
