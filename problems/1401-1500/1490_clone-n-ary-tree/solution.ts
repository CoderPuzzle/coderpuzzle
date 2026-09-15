function cloneTree(root: Node | null): Node | null {
    if (root === null) {
        return null;
    }
    // Level-order copy: every original node gets exactly one fresh clone,
    // and the registry records which clone belongs to it, so each original
    // child link is replayed through the registry.
    const clones = new Map<Node, Node>();
    clones.set(root, new Node(root.val));
    const queue: Node[] = [root];
    while (queue.length > 0) {
        const node = queue.shift()!;
        for (const child of node.children) {
            clones.set(child, new Node(child.val));
            clones.get(node)!.children.push(clones.get(child)!);
            queue.push(child);
        }
    }
    return clones.get(root)!;
}
