function findRoot(tree: Array<Node | null>): Node | null {
    // Value cancellation: every non-root appears exactly once as someone's
    // child, so summing every node's value and subtracting every child's
    // value cancels everything except the root's value. A second scan
    // turns that surviving value back into its node — no extra collection
    // is kept at any point.
    let total = 0;
    for (const node of tree) {
        total += node!.val;
        for (const child of node!.children) {
            total -= child.val;
        }
    }
    for (const node of tree) {
        if (node!.val === total) {
            return node;
        }
    }
    return null;
}
