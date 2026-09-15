function cloneTree(root: Node | null): Node | null {
    if (root === null) {
        return null;
    }
    const clone = new Node(root.val);
    for (const child of root.children) {
        clone.children.push(cloneTree(child));
    }
    return clone;
}
