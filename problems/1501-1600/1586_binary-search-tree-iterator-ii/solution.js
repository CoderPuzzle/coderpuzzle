class BSTIterator {
    // Ascending values collected once by an iterative in-order traversal
    // (explicit stack, so depth never risks the call stack). index points
    // at the current value, starting at -1 for "before the first value".
    constructor(root) {
        this.values = [];
        this.index = -1;
        const stack = [];
        let node = root;
        while (stack.length > 0 || node !== null) {
            while (node !== null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            this.values.push(node.val);
            node = node.right;
        }
    }

    hasNext() {
        return this.index + 1 < this.values.length;
    }

    next() {
        this.index++;
        return this.values[this.index];
    }

    hasPrev() {
        return this.index > 0;
    }

    prev() {
        this.index--;
        return this.values[this.index];
    }
}
