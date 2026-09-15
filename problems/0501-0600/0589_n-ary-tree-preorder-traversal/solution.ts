function preorder(root: Node | null): number[] {
    if (root === null) return [];
    const out: number[] = [];
    const stack: Node[] = [root];
    while (stack.length > 0) {
        const node = stack.pop() as Node;
        out.push(node.val);
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }
    }
    return out;
}
