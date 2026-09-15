function str2tree(s: string): TreeNode | null {
    // The parens spell a preorder walk: every integer opens a node, and
    // every parenthesized group is one whole subtree written right after
    // the node that owns it. The stack holds the ancestors still open
    // for children, so one left-to-right scan decides each node in the
    // very order its pieces appear.
    const stack: TreeNode[] = [];
    let i = 0;
    const n = s.length;
    while (i < n) {
        const ch = s[i];
        if (ch === "(") {
            i += 1;
        } else if (ch === ")") {
            // A group just closed: the subtree on top is finished and
            // belongs to the node underneath — in the left slot if that
            // is still open, otherwise the right.
            const child = stack.pop()!;
            const parent = stack[stack.length - 1];
            if (parent !== undefined) {
                if (parent.left === null) {
                    parent.left = child;
                } else {
                    parent.right = child;
                }
            }
            i += 1;
        } else {
            // Anything else starts a value: a run of digits with an
            // optional leading '-', up to the next parenthesis.
            let j = i;
            while (j < n && s[j] !== "(" && s[j] !== ")") {
                j += 1;
            }
            stack.push(new TreeNode(parseInt(s.slice(i, j), 10)));
            i = j;
        }
    }
    // Every node but the root is closed by its group's ')', so exactly
    // the root remains — or nothing, for the empty string.
    return stack.length > 0 ? stack[0] : null;
}
