function recoverFromPreorder(traversal: string): TreeNode | null {
    // Parse the string into (depth, value) pairs: a run of dashes gives the
    // depth, then a run of digits gives the value (values are guaranteed
    // positive, so no '-' ever appears inside a digit run).
    const n = traversal.length;
    let i = 0;
    const stack: TreeNode[] = [];
    while (i < n) {
        let depth = 0;
        while (i < n && traversal[i] === "-") {
            depth += 1;
            i += 1;
        }
        let j = i;
        while (j < n && traversal[j] >= "0" && traversal[j] <= "9") {
            j += 1;
        }
        const value = parseInt(traversal.slice(i, j), 10);
        i = j;
        // The node at this depth replaces everything deeper than it on the
        // current path; whatever remains on top is its parent.
        stack.length = Math.min(stack.length, depth);
        const node = new TreeNode(value);
        if (stack.length > 0) {
            const parent = stack[stack.length - 1];
            if (parent.left === null) {
                parent.left = node;
            } else {
                parent.right = node;
            }
        }
        stack.push(node);
    }
    return stack.length > 0 ? stack[0] : null;
}
