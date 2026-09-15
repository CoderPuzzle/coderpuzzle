function inorderSuccessor(tree: NodeWithNext | null, node: number): NodeWithNext | null {
    let target: NodeWithNext | null = null;
    const stack: NodeWithNext[] = [];
    if (tree !== null) stack.push(tree);
    while (stack.length > 0 && target === null) {
        const current = stack.pop()!;
        if (current.val === node) target = current;
        if (current.left !== null) stack.push(current.left);
        if (current.right !== null) stack.push(current.right);
    }
    if (target === null) return null;
    if (target.right !== null) {
        let successor = target.right;
        while (successor.left !== null) successor = successor.left;
        return successor;
    }
    while (target.parent !== null && target.parent.left !== target) {
        target = target.parent;
    }
    return target.parent;
}
