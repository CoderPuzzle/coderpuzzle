class BSTIterator {
    // Lazy in-order traversal via a left-spine stack: the top is the
    // smallest unvisited node and the stack holds exactly one root-to-node
    // path (O(h) memory).
    private stack: TreeNode[];

    constructor(root: TreeNode | null) {
        this.stack = [];
        this.pushSpine(root);
    }

    // Everything on this path is smaller than what lies below it, so the
    // last one pushed is the next value in order.
    private pushSpine(node: TreeNode | null): void {
        while (node !== null) {
            this.stack.push(node);
            node = node.left;
        }
    }

    next(): number {
        const node = this.stack.pop()!;
        // The popped node's right subtree holds the values that come next;
        // its left spine is the front of that block.
        this.pushSpine(node.right);
        return node.val;
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }
}
