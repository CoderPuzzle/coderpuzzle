function connect(root: NodeWithNext | null): NodeWithNext | null {
    if (root === null) return null;
    const queue: NodeWithNext[] = [root];
    while (queue.length > 0) {
        // Snapshot the width now: children pushed below belong to the next
        // level, so draining exactly this many nodes walks one level per
        // round.
        const width = queue.length;
        let previous: NodeWithNext | null = null;
        for (let i = 0; i < width; i++) {
            const node = queue.shift()!;
            // The node dequeued just before this one is exactly its
            // right-hand neighbor; the level's last node finds no
            // successor and keeps its empty `next`.
            if (previous !== null) previous.next = node;
            previous = node;
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }
    return root;
}
