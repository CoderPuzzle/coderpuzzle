function connect(root: NodeWithNext | null): NodeWithNext | null {
    if (root === null) return null;
    let level: NodeWithNext | null = root;
    while (level.left !== null) {
        let head: NodeWithNext | null = level;
        while (head !== null) {
            head.left!.next = head.right;
            if (head.next !== null) {
                head.right!.next = head.next.left;
            }
            head = head.next;
        }
        level = level.left;
    }
    return root;
}
