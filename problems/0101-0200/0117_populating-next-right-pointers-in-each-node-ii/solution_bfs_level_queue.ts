function connect(root: NodeWithNext | null): NodeWithNext | null {
    if (root === null) {
        return null;
    }
    const queue: NodeWithNext[] = [root];
    while (queue.length > 0) {
        // queue.length is this level's width; children pushed inside the
        // loop belong to the next level and never enter this round.
        const size = queue.length;
        let previous: NodeWithNext | null = null;
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!;
            // Link to whoever is shifted next within the same level; the
            // level's last node keeps the empty next it started with.
            if (previous !== null) {
                previous.next = node;
            }
            previous = node;
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }
    return root;
}
