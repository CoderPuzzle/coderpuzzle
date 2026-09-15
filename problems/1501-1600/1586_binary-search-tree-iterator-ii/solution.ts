class BSTIterator {
    // Ascending values collected once by an iterative in-order traversal
    // (explicit stack, so depth never risks the call stack). index points
    // at the current value, starting at -1 for "before the first value".
    private values: number[];
    private index: number;

    constructor(root: TreeNode | null) {
        this.values = [];
        this.index = -1;
        const stack: TreeNode[] = [];
        let node = root;
        while (stack.length > 0 || node !== null) {
            while (node !== null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop()!;
            this.values.push(node.val);
            node = node.right;
        }
    }

    hasNext(): boolean {
        return this.index + 1 < this.values.length;
    }

    next(): number {
        this.index++;
        return this.values[this.index];
    }

    hasPrev(): boolean {
        return this.index > 0;
    }

    prev(): number {
        this.index--;
        return this.values[this.index];
    }
}
