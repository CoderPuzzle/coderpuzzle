function copyRandomBinaryTree(root: RandomTreeNode | null): RandomTreeNode | null {
    if (root === null) {
        return null;
    }
    // Weave: every original node's left slot comes to hold its own clone,
    // and the clone's left holds the original's former left child, so the
    // original structure stays walkable one step down.
    const stack: Array<RandomTreeNode> = [root];
    while (stack.length > 0) {
        const node = stack.pop()!;
        const clone = new RandomTreeNode(node.val);
        const left = node.left;
        clone.left = left;
        node.left = clone;
        if (left !== null) {
            stack.push(left);
        }
        if (node.right !== null) {
            stack.push(node.right);
        }
    }
    // Far links: an original's clone is node.left, so the clone of anything
    // the original points across to — its random target and its right child
    // — is that target's own left.
    stack.push(root);
    while (stack.length > 0) {
        const node = stack.pop()!;
        const clone = node.left;
        if (node.random !== null) {
            clone.random = node.random.left;
        }
        const right = node.right;
        if (right !== null) {
            clone.right = right.left;
            stack.push(right);
        }
        if (clone.left !== null) {
            stack.push(clone.left);
        }
    }
    const answer = root.left;
    // Split: restore each original's left child and hand the clone the clone
    // of that subtree.
    stack.push(root);
    while (stack.length > 0) {
        const node = stack.pop()!;
        const clone = node.left;
        const left = clone.left;
        clone.left = left === null ? null : left.left;
        node.left = left;
        if (left !== null) {
            stack.push(left);
        }
        if (node.right !== null) {
            stack.push(node.right);
        }
    }
    return answer;
}
