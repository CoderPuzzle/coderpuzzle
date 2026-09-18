class BSTIterator {
    // Lazy in-order traversal via a left-spine stack: the top is the
    // smallest unvisited node and the stack holds exactly one root-to-node
    // path (O(h) memory).
    constructor(root) {
        this.stack = [];
        this.pushSpine(root);
    }

    // Everything on this path is smaller than what lies below it, so the
    // last one pushed is the next value in order.
    pushSpine(node) {
        while (node !== null) {
            this.stack.push(node);
            node = node.left;
        }
    }

    next() {
        const node = this.stack.pop();
        // The popped node's right subtree holds the values that come next;
        // its left spine is the front of that block.
        this.pushSpine(node.right);
        return node.val;
    }

    hasNext() {
        return this.stack.length > 0;
    }
}
