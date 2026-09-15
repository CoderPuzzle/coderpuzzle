function connect(root: NodeWithNext | null): NodeWithNext | null {
    let level: NodeWithNext | null = root;
    while (level !== null) {
        let head: NodeWithNext | null = null;
        let tail: NodeWithNext | null = null;
        for (let node = level; node !== null; node = node.next) {
            for (const child of [node.left, node.right]) {
                if (child === null) continue;
                if (head === null) {
                    head = child;
                } else {
                    tail!.next = child;
                }
                tail = child;
            }
        }
        level = head;
    }
    return root;
}
